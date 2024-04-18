import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
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
  tablespacing:{
    marginTop: '20px',
  },
  centering: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh" // Optional: Adjust the height of the container
  },

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
  },
  tableWrapper: {
    border: "1px solid #ddd", 
    borderRadius: "5px", 
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "rgba(128, 128, 128, 0.1)"   },
  

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
  const [technicians, setTechnicians] = useState([]);



  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        const user = resp.data;

        // Check if user role is either "Manager" or "superAdmin"
        if (user.employeeType !== "Manager" && user.employeeType !== "superAdmin") {
          throw new Error("Unauthorized access");
        }

        setUser(user);
        // Store the session ID
        setSessionId(user.employeeID); // Assuming user.employeeID contains the session ID

        // Fetch service appointments and members data
        fetchData();
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
        navigate("/login");
      }
    })();
  }, [navigate]);
  

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

      // Fetch Technicians
      const technicianResponse = await fetch(`${BASE_URL}/api/employees/technicians`);
      const techniciansData = await technicianResponse.json();
      console.log("Technicians fetched successfully:", techniciansData);

            // Fetch Bids
            const bidsResponse = await fetch(`${FINAN_URL}/api/current-bids`);
            const bidsData = await bidsResponse.json();
            console.log("Bids fetched successfully:", bidsData);
            setBids(bidsData);
      
            // Fetch Test Drives
            const testDrivesResponse = await fetch(`${BASE_URL}/api/testdrives`);
            const testDrivesData = await testDrivesResponse.json();
            console.log("Test Drives fetched successfully:", testDrivesData);
            setTestDrives(testDrivesData);
      
            // Fetch Vehicle Listings
            const vehicleListingsResponse = await fetch(`${BASE_URL}/api/vehicles/search`);
            const vehicleListingsData = await vehicleListingsResponse.json();
            console.log("Vehicle Listings fetched successfully:", vehicleListingsData);
            setVehicleListings(vehicleListingsData);
      
      setTechnicians(techniciansData);
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


  const [selectedTab, setSelectedTab] = useState(0);

  const renderTable = () => {
    switch (selectedTab) {
      case 0: // If "ALL" is selected, render all tables with borders
        return (
          <>
            <div style={styles.tableWrapper}>
              <ServiceCenter />
            </div>
            <div style={styles.tableWrapper}>
              <BidsTable />
            </div>
            <div style={styles.tableWrapper}>
              <TestDrivesTable />
            </div>
            <div style={styles.tableWrapper}>
              <CustomersTable />
            </div>
            <div style={styles.tableWrapper}>
              <VehicleListingsTable />
            </div>
            <div style={styles.tableWrapper}>
              <SalesReportTable />
            </div>
          </>
        );
      case 1: // Render selected table with border
        return (
          <div style={styles.tableWrapper}>
            <ServiceCenter />
          </div>
        );
      case 2:
        return (
          <div style={styles.tableWrapper}>
            <BidsTable />
          </div>
        );
      case 3:
        return (
          <div style={styles.tableWrapper}>
            <TestDrivesTable />
          </div>
        );
      case 4:
        return (
          <div style={styles.tableWrapper}>
            <CustomersTable />
          </div>
        );
      case 5:
        return (
          <div style={styles.tableWrapper}>
            <VehicleListingsTable />
          </div>
        );
      case 6:
        return (
          <div style={styles.tableWrapper}>
            <SalesReportTable />
          </div>
        );
      default:
        return null;
    }
  };
  
  
  const ServiceCenter = () => {
    // Function to handle selection change in the dropdown
    const handleSelectionChange = (appointmentId) => async (event) => {
      console.log("APP: " + appointmentId);
      console.log("EMPL: " + event.target.value);
      // Get the selected technician ID from the dropdown
      const selectedTechnicianId = event.target.value;
    
      // Call the assignTechnician function with appointment ID, selected technician ID, and session ID
      try {
        await assignTechnician(appointmentId, selectedTechnicianId, sessionId);
      } catch (error) {
        console.error('Error assigning technician:', error.message);
      }
    };
    
  
    // Function to assign a technician to an appointment
// Function to assign a technician to an appointment
const assignTechnician = (appointmentId, technicianId, sessionId) => {
  // Create a JSON object with appointment_id, employee_id, and session_id
  const data = {
    appointment_id: appointmentId,
    employee_id: technicianId,
  };

  fetch(`${BASE_URL}/api/manager/assign-service-appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // Include cookies in the request
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
        <table className="table table-bordered table-striped"> {/* Added table-striped class */}
        <thead className="thead-dark">
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
                {technicians.map(technician => (
                  <option key={technician.employeeID} value={technician.employeeID}>
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
        <table className="table table-bordered table-striped"> {/* Added table-striped class */}
        <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Assigned Appointment</th>
            </tr>
          </thead>
          <tbody>
          {technicians.map(technician => (
          <tr key={technician.employeeID}>
            <td>{technician.first_name}</td>
            <td>{technician.last_name}</td>
            <td>{technician.email}</td>
            <td>{technician.employeeID}</td>
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
      <table className="table table-bordered table-striped"> {/* Added table-striped class */}
        <thead className="thead-dark">
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
      <table className="table table-bordered table-striped"> {/* Added table-striped class */}
        <thead className="thead-dark">
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
      <table className="table table-bordered table-striped"> {/* Added table-striped class */}
        <thead className="thead-dark">
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
      <table className="table table-bordered table-striped"> {/* Added table-striped class */}
        <thead className="thead-dark">
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
              <td>
  <img
    src={vehicle.pictureLibraryLink}
    alt="Vehicle"
    style={{ width: '150px', height: '100px' }}
  />
</td>            </tr>
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
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 0 ? styles.selected : {}} onClick={() => { setSelectedTab(0); }}>ALL</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 1 ? styles.selected : {}} onClick={() => { setSelectedTab(1); }}>Service Center</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 2 ? styles.selected : {}} onClick={() => { setSelectedTab(2); }}>Bids</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 3 ? styles.selected : {}} onClick={() => { setSelectedTab(3); }}>Test Drives</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 4 ? styles.selected : {}} onClick={() => { setSelectedTab(4); }}>Customers</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 5 ? styles.selected : {}} onClick={() => { setSelectedTab(5); }}>Vehicle Listings</button>
        <button className="btn btn-block btn-dark mb-3" style={selectedTab === 6 ? styles.selected : {}} onClick={() => { setSelectedTab(6); }}>Sales Report</button>
        <Link to="/create-employee-account" className="btn btn-block btn-danger mb-3">Create Employee Acct.</Link>
        <Link to="/add-new-vehicle" className="btn btn-block btn-danger">Add new Vehicle</Link>
      </div>
      <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10"> {/* Adjust width for different screen sizes */}
          {renderTable()}
        </div>
      </div>
    </div>
  </div>
  );



};

export default ManagerPage;
