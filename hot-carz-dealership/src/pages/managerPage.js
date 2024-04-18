import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import editIcon from "../imgs/icons/pencil.png";
import deleteIcon from "../imgs/icons/redx.png";

// to-do
//delete_service_appointment
//edit_service_menu()
//assign_service_appointments

//technician
//technician_view_service_appointments
//technician edit



const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  buttonsContainer: {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    height: "100vh",
    overflowY: "auto",
  },
  modalContainer: {
    flex: 1,
  },
  modalButton: {
    display: "block",
    marginBottom: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "10px",
  },
  tableContainer: {
    flex: 1,
    width: "100%",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    border: "2px solid black",
  },
  th: {
    border: "2px solid black",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "2px solid black",
    padding: "8px",
    textAlign: "left",
  },

  creationButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "20px",
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    margin: "10px 0",
  },

  selected: {
    backgroundColor: "#007bff",
    color: "#fff",
  },

  edit: {
    background: "none",
    border: "none",
    padding: 0,
    marginRight: "5px",
    cursor: "pointer",
  },
  delete: {
    background: "none",
    border: "none",
    padding: 0,
    marginRight: "5px",
    cursor: "pointer",
  },
  editIcon: {
    width: "20px",
    height: "20px",
  },
  deleteIcon: {
    width: "20px",
    height: "20px",
  }

};
const ManagerPage = () => {
  const FINAN_URL = "http://localhost:5001";

  const [bids, setBids] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicleListings, setVehicleListings] = useState([]);


  const [salesReport, setSalesReport] = useState([]);


  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);



  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${BASE_URL}/@emp`);
        setUser(resp.data);
        // Fetch service appointments and members data
        fetchData();
      } catch (error) {
        console.log("Not Authenticated");
      }
    })();
  }, []);


  const fetchData = async () => {
    try {
      // Fetch service appointments
      const appointmentsResponse = await fetch(`${BASE_URL}/api/service-appointments`);
      const appointmentsData = await appointmentsResponse.json();
      console.log("Service Appointments fetched successfully:", appointmentsData);

      // Fetch members
      const membersResponse = await fetch(`${BASE_URL}/api/members`);
      const membersData = await membersResponse.json();
      console.log("Members fetched successfully:", membersData);

      //Fetch Employees
      const employeeResponse = await fetch(`${BASE_URL}/api/employees`)
      const employeeData = await employeeResponse.json();
      console.log("Employees fetched successfully", employeeData)
      // Update state variables with fetched data

      setEmployees(employeeData);
      setServiceAppointments(appointmentsData);
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    // Function to get member details by memberID
  const getMemberDetails = (memberID) => {
    const member = members.find((member) => member.memberID === memberID);
    return member
      ? {
        memberID: member.memberID,
        first_name: member.first_name,
        last_name: member.last_name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        state: member.state,
        zipcode: member.zipcode,
        join_date: member.join_date,
      }
      : null;
  };

  const fetchDataSelection = async (type) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${type}`);
      console.log("Response received:", response);
      const data = await response.json();
      console.log("Data fetched successfully:", data);

      // Update the state variables based on the type of data
      switch (type) {
        case "bids":
          setBids(data);
          break;
        case "testdrives":
          setTestDrives(data);
          break;
        case "members":
          setCustomers(data);
          break;
        case "vehicles/search":
          setVehicleListings(data);
          break;
        default:
          console.error("Unknown data type:", type);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [selectedTab, setSelectedTab] = useState(1);

  const renderTable = () => {
    switch (selectedTab) {
      case 1:
        return <ServiceCenter />
      case 2:
        return <BidsTable />;
      case 3:
        return <TestDrivesTable />;
      case 4:
        return <CustomersTable />;
      case 5:
        return <VehicleListingsTable />;
      case 6:
        return <SalesReportTable />;
      default:
        return null;
    }
  };

  const ServiceCenter = () => {
    // Function to handle selection change in the dropdown
    const handleSelectionChange = (appointmentId) => (event) => {

      console.log("APP: " + appointmentId);
      console.log("EMPL: " + event.target.value);
      // Get the selected technician ID from the dropdown
      const selectedTechnicianId = event.target.value;
  
      // Call the assignTechnician function with appointment ID and selected technician ID
      assignTechnician(appointmentId, selectedTechnicianId);
    };
  
    // Function to assign a technician to an appointment
    const assignTechnician = (appointmentId, technicianId) => {
      // Create a JSON object with appointment_id and employee_id
      const data = {
        appointment_id: appointmentId,
        employee_id: technicianId
      };
  
      fetch(`${BASE_URL}/api/manager/assign-service-appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to assign technician to appointment');
          }
          // Handle success response here if needed
          console.log('Technician assigned successfully');
        })
        .catch(error => {
          // Handle error here
          console.error('Error assigning technician:', error.message);
        });
    };
  
    return (
      <div className="table-responsive">
        <h2>Service Appointments</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Member ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Appointment Date</th>
              <th>Technician Assigned</th>
            </tr>
          </thead>
          <tbody>
            {serviceAppointments.map(appointment => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                <td>{appointment.memberID}</td>
                <td>{getMemberDetails(appointment.memberID)?.first_name}</td>
                <td>{getMemberDetails(appointment.memberID)?.last_name}</td>
                <td>{getMemberDetails(appointment.memberID)?.email}</td>
                <td>{getMemberDetails(appointment.memberID)?.phone}</td>
                <td>{appointment.appointment_date}</td>
                <td>
                  {/* Select box for technician assignment */}
                  <select onChange={handleSelectionChange(appointment.appointment_id)}>
                    <option value="-" key="default">-</option>
                    {employees.map((technician, index) => (
                      <option key={`technician_${technician.employee_id}_${index}`} value={technician.employeeID}>
                        {technician.first_name} {technician.last_name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <h2>Technicians Management</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Assigned Appointment</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(employee => employee.employeeType === 'Technician')
              .map(employee => (
                <tr key={employee.employeeID}>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.employeeID}</td>
                  <td>{/* Assigned Appointment */}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const BidsTable = () => (
    <div className="table-responsive">
      <h2>Bids</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>VIN</th>
            <th>MSRP</th>
            <th>Bid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, index) => (
            <tr key={index}>
              <td>{bid.make}</td>
              <td>{bid.model}</td>
              <td>{bid.VIN}</td>
              <td>{bid.MSRP}</td>
              <td>{bid.bidAmount}</td>
              <td>{/* Action buttons */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const TestDrivesTable = () => (
    <div className="table-responsive">
      <h2>Test Drives</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer Phone</th>
            <th>Full Name</th>
            <th>Vehicle</th>
            <th>Datetime</th>
          </tr>
        </thead>
        <tbody>
          {testDrives.map((testDrive, index) => (
            <tr key={index}>
              <td>{testDrive.phone}</td>
              <td>{testDrive.fullname}</td>
              <td>{testDrive.car_make_model}</td>
              <td>{testDrive.appointment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Similarly, update the other table components in the same way


  const CustomersTable = () => (
    <div className="table-responsive">
      <h2>Customers</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone #</th>
            <th>Email</th>
            <th>Join Date</th>
            <th>memberID</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.join_date}</td>
              <td>{customer.memberID}</td>
            </tr>
          ))}        </tbody>
      </table>
    </div>

  );

  const VehicleListingsTable = () =>
  (
    <div className="table-responsive">
      <h2>Vehicle Listings</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>VIN</th>
            <th>Page Views</th>
            <th>Price</th>
            <th>Status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {vehicleListings.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.VIN_carID}</td>
              <td>{vehicle.viewsOnPage}</td>
              <td>{vehicle.price}</td>
              <td><img src={vehicle.pictureLibraryLink} alt="Vehicle" /></td>
            </tr>
          ))}        </tbody>
      </table>
    </div>
  );
  const SalesReportTable = () => {
    const [salesReport, setSalesReport] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [totalSales, setTotalSales] = useState('');

    useEffect(() => {
      const response =  fetch(`${FINAN_URL}/`);
      console.log(response);
      const response1 =  fetch(`${BASE_URL}/`);
      console.log(response1);
     /// fetchSalesReport();
    }, []);
  
  // Function to handle changes in the month dropdown
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Function to handle changes in the year dropdown
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if both month and year are selected
    if (!selectedMonth || !selectedYear) {
      alert('Please select both month and year.');
      return;
    }
  
    try {
      // Send a GET request to your backend API with selected month and year
      const response = await fetch(`${FINAN_URL}/api/manager/monthly-sales-report?month=${selectedMonth}&year=${selectedYear}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales report');
      }
      
      const data = await response.json();
      setSalesReport(data.sales_report);
      // Set total sales in the state
      setTotalSales(data.total_sales);
    } catch (error) {
      console.error('Error fetching sales report:', error.message);
    }
  };
  
  


  return (
    <div className="table-responsive">
    <h2>Sales Report</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="month">Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <label htmlFor="year">Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          <option value="">Select Year</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
        <button type="submit">Generate Report</button>
      </div>
    </form>
    <table className="table table-bordered">
        <thead>
          <tr>
            <th>Purchase ID</th>
            <th>Member ID</th>
            <th>Confirmation Number</th>
            <th>Vehicle ID</th>
            <th>Bid Value</th>
          </tr>
        </thead>
        <tbody>
          {salesReport.map((sale, index) => (
            <tr key={index}>
              <td>{sale.purchase_id}</td>
              <td>{sale.member_id}</td>
              <td>{sale.confirmation_number}</td>
              <td>{sale.vehicle_id}</td>
              <td>{sale.bid_value}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Sales:</td>
            <td>{totalSales}</td>
          </tr>
        </tfoot>
      </table>
  </div>

  );
  };
  



  return (
    <div>
      <div className="bg-dark text-white p-3" style={{ height: "100vh", overflowY: "auto", position: "fixed", left: 0, display: "flex", flexDirection: "column" }}>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 1 ? styles.selected : {}} onClick={() => { fetchDataSelection(""); setSelectedTab(1); renderTable(); }}>Service Center</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 2 ? styles.selected : {}} onClick={() => { fetchDataSelection(""); setSelectedTab(2); renderTable(); }}>Bids</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 3 ? styles.selected : {}} onClick={() => { fetchDataSelection("testdrives"); setSelectedTab(3); renderTable(); }}>Test Drives</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 4 ? styles.selected : {}} onClick={() => { fetchDataSelection("members"); setSelectedTab(4); renderTable(); }}>Customers</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 5 ? styles.selected : {}} onClick={() => { fetchDataSelection("vehicles/search"); setSelectedTab(5); renderTable(); }}>Vehicle Listings</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 6 ? styles.selected : {}} onClick={() => { setSelectedTab(6); renderTable(); }}>Sales Report</button>
        <Link to="/create-employee-account" className="btn btn-block btn-danger mb-3">Create Employee Acct.</Link>
        <Link to="/add-new-vehicle" className="btn btn-block btn-danger">Add new Vehicle</Link>
      </div>
      <div className="container" style={{ marginLeft: "250px" }}>
        <div className="row">
          <div >
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );



};

export default ManagerPage;
