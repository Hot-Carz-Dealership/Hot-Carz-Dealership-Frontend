import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import VehicleImage from "../utilities/VehicleImage";
import Button from "@mui/material/Button";


// to-do
//delete_service_appointment
//edit_service_menu()
//assign_service_appointments

//technician
//technician_view_service_appointments
//technician edit



const styles = {
  tablespacing: {
    marginTop: '20px',
  },

  table: {
    borderCollapse: "collapse",
    width: "100%",
    border: "2px solid black",
    height: "500px",
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
    backgroundColor: "rgba(128, 128, 128, 0.1)"
  },
  welcomeScreen: {
    textAlign: "center",
    marginTop: "100px", // Adjust as needed
    padding: "50px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
  },
  welcomeScreenHeading: {
    fontSize: "2.5em",
    marginBottom: "20px",
  },
  welcomeScreenText: {
    fontSize: "1.2em",
    marginBottom: "30px",
  },
  welcomeScreenButton: {
    fontSize: "1.2em",
  },
  tableHeight: {
    height: "1000px",
  },
};

const ManagerPage = () => {
  const FINAN_URL = "http://localhost:5001";

  const [bids, setBids] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [vehicleListings, setVehicleListings] = useState([]);


  //const [salesReport, setSalesReport] = useState([]);


  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [showTable, setShowTable] = useState(false);

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
        await fetchData(); // Move fetchData here
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
        navigate("/login");
      }
    })();
  }, [navigate]);


  const handleGetStarted = () => {
    setShowTable(true);
  };

  const logOutUser = async () => {
    await httpClient.post(`${BASE_URL}/api/logout`);
    window.location.href = "/";
  };
  const fetchData = async () => {
    try {
      // Fetch service appointments
      const appointmentsResponse = await fetch(`${BASE_URL}/api/service-appointments`);
      if (!appointmentsResponse.ok) {
        throw new Error('Failed to fetch service appointments');
      }
      const appointmentsData = await appointmentsResponse.json();
      console.log("Service Appointments fetched successfully:", appointmentsData);
      // Update state variable with fetched data
      setServiceAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching service appointments:", error);
    }

    try {
      // Fetch members
      const servicesResponse = await fetch(`${BASE_URL}/api/service-menu`);
      if (!servicesResponse.ok) {
        throw new Error('Failed to fetch services');
      }
      const serviceData = await servicesResponse.json();
      console.log("Services fetched successfully:", serviceData);
      // Update state variable with fetched data
      setServices(serviceData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }

    try {
      // Fetch members
      const membersResponse = await fetch(`${BASE_URL}/api/members`);
      if (!membersResponse.ok) {
        throw new Error('Failed to fetch members');
      }
      const membersData = await membersResponse.json();
      console.log("Members fetched successfully:", membersData);
      // Update state variable with fetched data
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
    }

    try {
      // Fetch Employees
      const employeeResponse = await fetch(`${BASE_URL}/api/employees`);
      if (!employeeResponse.ok) {
        throw new Error('Failed to fetch employees');
      }
      const employeeData = await employeeResponse.json();
      console.log("Employees fetched successfully", employeeData);
      // Update state variable with fetched data
      setEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }

    try {
      // Fetch Technicians
      const technicianResponse = await fetch(`${BASE_URL}/api/employees/technicians`);
      if (!technicianResponse.ok) {
        throw new Error('Failed to fetch technicians');
      }
      const techniciansData = await technicianResponse.json();
      console.log("Technicians fetched successfully:", techniciansData);
      // Update state variable with fetched data
      setTechnicians(techniciansData);
    } catch (error) {
      console.error("Error fetching technicians:", error);
    }

    try {
      // Fetch Bids
      const bidsResponse = await fetch(`${FINAN_URL}/api/current-bids`);
      if (!bidsResponse.ok) {
        throw new Error('Failed to fetch bids');
      }
      const bidsData = await bidsResponse.json();
      console.log("Bids fetched successfully:", bidsData);
      // Update state variable with fetched data
      setBids(bidsData);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }

    try {
      const purchasesResponse = await fetch(`${FINAN_URL}/api/purchases`);
      if (!purchasesResponse.ok) {
        throw new Error('Failed to fetch purchases');
      }
      const purchasesData = await purchasesResponse.json();
      setPurchases(purchasesData.purchases); // Update purchases state here
    } catch (error) {
      console.error('Error fetching purchases:', error.message);
    }
    

    try {
      // Fetch Test Drives
      const testDrivesResponse = await fetch(`${BASE_URL}/api/testdrives`);
      if (!testDrivesResponse.ok) {
        throw new Error('Failed to fetch test drives');
      }
      const testDrivesData = await testDrivesResponse.json();
      console.log("Test Drives fetched successfully:", testDrivesData);
      // Update state variable with fetched data
      setTestDrives(testDrivesData);
    } catch (error) {
      console.error("Error fetching test drives:", error);
    }

    try {
      // Fetch Vehicle Listings
      const vehicleListingsResponse = await fetch(`${BASE_URL}/api/vehicles/search`);
      if (!vehicleListingsResponse.ok) {
        throw new Error('Failed to fetch vehicle listings');
      }
      const vehicleListingsData = await vehicleListingsResponse.json();
      console.log("Vehicle Listings fetched successfully:", vehicleListingsData);
      // Update state variable with fetched data
      setVehicleListings(vehicleListingsData);
    } catch (error) {
      console.error("Error fetching vehicle listings:", error);
    }

    // If there are any other operations or data sets to fetch, add similar try-catch blocks here.
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
              <TechnicianTable />
            </div>
            <div style={styles.tableWrapper}>
              <BidsTable />
            </div>
            <div style={styles.tableWrapper}>
              <PurchaseTable />
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
      case 7:
        return (
          <div style={styles.tableWrapper}>
            <TechnicianTable />
          </div>
        );
      case 8:
        return (
          <div style={styles.tableWrapper}>
            <PurchaseTable />
          </div>
        );
      default:
        return null;
    }
  };


  const ServiceCenter = () => {

    const [services, setServices] = useState([]);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');

    const handleSelectionChange = (appointmentId) => async (event) => {
      console.log("APP: " + appointmentId);
      console.log("EMPL: " + event.target.value);
      // Get the selected technician ID from the dropdown
      const selectedTechnicianId = event.target.value;

      // Call the assignTechnician function with appointment ID, selected technician ID, and session ID
      try {
        await assignTechnician(appointmentId, selectedTechnicianId, sessionId);
        // Update the appointment object with the newly selected technician ID
        const updatedAppointments = serviceAppointments.map(appointment => {
          if (appointment.appointment_id === appointmentId) {
            return {
              ...appointment,
              employeeID: selectedTechnicianId
            };
          }
          return appointment;
        });
        // Update the state with the updated appointments
        setServiceAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error assigning technician:', error.message);
      }
    };


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

    useEffect(() => {
      // Fetch services from the backend when the component mounts
      fetchServices();
    }, []);

    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/service-menu`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    const handleAddService = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/manager/edit-service-menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Include cookies in the request
          body: JSON.stringify({ edit_or_add: 1, service_name: newServiceName, price: newServicePrice })
        });
        if (!response.ok) {
          throw new Error('Failed to add service');
        }
        // Refetch services after adding a new service
        await fetchServices();
        // Clear input fields after adding a new service
        setNewServiceName('');
        setNewServicePrice('');
      } catch (error) {
        console.error('Error adding service:', error.message);
      }
    };

    const handleDeleteService = async (serviceID) => {
      try {
        const response = await fetch(`${BASE_URL}/api/manager/edit-service-menu`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Include cookies in the request

          body: JSON.stringify({ service_id: serviceID })
        });
        if (!response.ok) {
          throw new Error('Failed to delete service');
        }
        // Refetch services after deleting a service
        await fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error.message);
      }
    };
    const handleEditService = (service) => {
      // Prompt window to edit service name and price
      const editedName = prompt('Enter new service name:', service.service_name);
      const editedPrice = prompt('Enter new service price:', service.price);

      // If user clicks cancel, editedName and editedPrice will be null
      if (editedName !== null && editedPrice !== null) {
        // Update service name and price locally
        service.service_name = editedName;
        service.price = editedPrice;

        // Send updated service data to the backend
        updateService(service);
      }
    };

    const updateService = async (service) => {
      try {
        const response = await fetch(`${BASE_URL}/api/manager/edit-service-menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            edit_or_add: 2,  // Indicate editing mode
            serviceID: service.serviceID,
            service_name: service.service_name,
            price: service.price
          })
        });
        if (!response.ok) {
          throw new Error('Failed to update service');
        }
        // Refetch services after updating
        await fetchServices();
      } catch (error) {
        console.error('Error updating service:', error.message);
      }
    };


    return (
      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Service Appointments</h2>
        <table className="table table-bordered table-striped" style={styles.tableHeight}>
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Appointment Date</th>
              <th>Service Type</th>
              <th>Technician Assigned</th>
              <th>Technician Comment</th>
            </tr>
          </thead>
          <tbody>
            {serviceAppointments && serviceAppointments.map(appointment => (
              <tr key={appointment.appointment_id}>
                <td>{getMemberDetails(appointment.memberID)?.first_name}</td>
                <td>{getMemberDetails(appointment.memberID)?.last_name}</td>
                <td>{getMemberDetails(appointment.memberID)?.email}</td>
                <td>{getMemberDetails(appointment.memberID)?.phone}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.service_name}</td> {/* Display service name */}
                <td>
                  <select value={appointment.employeeID} onChange={handleSelectionChange(appointment.appointment_id)}>
                    <option value="-" key="default">-</option>
                    {technicians.map(technician => (
                      <option key={technician.employeeID} value={technician.employeeID}>
                        {technician.first_name} {technician.last_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{appointment.comments}</td> {/* Display technician comment */}
              </tr>
            ))}
            {!serviceAppointments && (
              <tr>
                <td colSpan="8">No service appointments available</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Current Available Services</h2>

        {/* Add Service Input Fields */}
        <div>
          <input
            type="text"
            placeholder="Enter service name"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter service price"
            value={newServicePrice}
            onChange={(e) => setNewServicePrice(e.target.value)}
          />
          <button onClick={handleAddService}>Add Service</button>
        </div>
        <br />
        <table className="table table-bordered table-striped" style={styles.tableHeight}>
          <thead className="thead-dark">
            <tr>
              <th>Service Name</th>
              <th>Service Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.serviceID}>
                <td>{service.service_name}</td>
                <td>{service.price}</td>
                <td>
                  <button onClick={() => handleEditService(service)}>Edit</button> {/* Call handleEditService function */}
                  <button onClick={() => handleDeleteService(service.serviceID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  };

  const TechnicianTable = () => {


    return (

      <div className="table-responsive" style={styles.tableHeight}>

        <h2>Technicians Management</h2>
        <table className="table table-bordered table-striped" style={styles.tableHeight}>
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {technicians && technicians.map(technician => (
              <tr key={technician.employeeID}>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
                <td>{technician.email}</td>
                <td>{technician.employeeID}</td>
                <td>{technician.phone}</td>
              </tr>
            ))}
            {!technicians && (
              <tr>
                <td colSpan="5">No technicians available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };


  const BidsTable = () => {
    const [bids, setBids] = useState([]);

    useEffect(() => {
      fetchCurrentBids();
    }, []);

    const fetchCurrentBids = async () => {
      try {
        const response = await fetch(`${FINAN_URL}/api/current-bids`);
        if (!response.ok) {
          throw new Error('Failed to fetch current bids');
        }
        const bidData = await response.json();
        setBids(bidData);
      } catch (error) {
        console.error('Error fetching current bids:', error.message);
      }
    };

    const handleBidConfirmation = async (bidId, confirmationStatus) => {
      console.log(bidId);
      try {
        const response = await fetch(`${FINAN_URL}/api/current-bids`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bidID: bidId, confirmationStatus: confirmationStatus })
        });
        if (!response.ok) {
          throw new Error('Failed to update bid status');
        }
        await fetchCurrentBids();
      } catch (error) {
        console.error('Error updating bid status:', error.message);
      }
    };


    return (
      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Bids</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>VIN</th>

              <th>MSRP</th>
              <th>Bid Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids && bids.map((bid, index) => (
              <tr key={index}>
                <td>{bid.make}</td>
                <td>{bid.model}</td>
                <td>{bid.VIN}</td>
                <td>{bid.MSRP}</td>

                <td>{bid.bidValue}</td>
                <td>{bid.bidStatus}</td>
                <td>
                  {bid.bidStatus === 'Processing' && (
                    <>
                      <button onClick={() => handleBidConfirmation(bid.bidID, 'Confirmed')}>Accept</button>
                      <button onClick={() => handleBidConfirmation(bid.bidID, 'Denied')}>Decline</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!bids && (
              <tr>
                <td colSpan="7">No bids available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const PurchaseTable = () => (

      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Purchases</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Purchase ID</th>
              <th>Bid ID</th>
              <th>VIN</th>
              <th>Member ID</th>
              <th>Confirmation Number</th>
            </tr>
          </thead>
          <tbody>
            {purchases && purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.purchaseID}</td>
                <td>{purchase.bidID}</td>
                <td>{purchase.VIN_carID}</td>
                <td>{purchase.memberID}</td>
                <td>{purchase.confirmationNumber}</td>
              </tr>
            ))}
            {!purchases && (
              <tr>
                <td colSpan="5">No purchases available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



          );

  const TestDrivesTable = () => (
    <div className="table-responsive" style={styles.tableHeight}>
      <h2>Test Drives</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Customer Phone</th>
            <th>Full Name</th>
            <th>Vehicle</th>
            <th>Datetime</th>
          </tr>
        </thead>
        <tbody>
          {testDrives && testDrives.map((testDrive, index) => (
            <tr key={index}>
              <td>{testDrive.phone}</td>
              <td>{testDrive.fullname}</td>
              <td>{testDrive.car_make_model}</td>
              <td>{testDrive.appointment_date}</td>
            </tr>
          ))}
          {!testDrives && (
            <tr>
              <td colSpan="4">No test drives available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  );

  // Similarly, update the other table components in the same way


  const CustomersTable = () => (
    <div className="table-responsive" style={styles.tableHeight}>
      <h2>Customers</h2>
      <table className="table table-bordered table-striped">
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
          {members && members.map((member, index) => (
            <tr key={index}>
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td>{member.join_date}</td>
              <td>{member.memberID}</td>
            </tr>
          ))}
          {!members && (
            <tr>
              <td colSpan="6">No customers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  );

  const VehicleListingsTable = () =>
  (<div className="table-responsive" style={styles.tableHeight}>
    <h2>Vehicle Listings</h2>
    <table className="table table-bordered table-striped">
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
        {vehicleListings && vehicleListings.map((vehicle, index) => (
          <tr key={index}>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.year}</td>
            <td>{vehicle.VIN_carID}</td>
            <td>{vehicle.viewsOnPage}</td>
            <td>{vehicle.price}</td>
            <td>
              {/* Render status here */}
            </td>
            <td>
              <VehicleImage
                className="w-[150px] "
                vin={vehicle.VIN_carID}
                bodyType={vehicle.body}
              />
            </td>
          </tr>
        ))}
        {!vehicleListings && (
          <tr>
            <td colSpan="8">No vehicle listings available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  );
  const SalesReportTable = () => {
    const [salesReport, setSalesReport] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [totalSales, setTotalSales] = useState('');

    useEffect(() => {
      const response = fetch(`${FINAN_URL}/`);
      console.log(response);
      const response1 = fetch(`${BASE_URL}/`);
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
      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Sales Report</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="month">Month:</label>
            <select id="month" value={selectedMonth} onChange={handleMonthChange}>
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
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
            <button type="submit">Generate Report</button>
          </div>
        </form>
        {salesReport ? (
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
        ) : (
          <p>No sales report available</p>
        )}
      </div>


    );
  };




  return (
    <div style={{ display: "flex" }}>
      <div className="bg-dark text-white p-3" style={{ height: "100vh", overflowY: "auto", position: "fixed", left: 0 }}>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 0 ? styles.selected : {}} onClick={() => { setSelectedTab(0); }}>ALL</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 1 ? styles.selected : {}} onClick={() => { setSelectedTab(1); }}>Service Center</button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 7 ? styles.selected : {}} onClick={() => { setSelectedTab(7); }}>Technicians</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 8 ? styles.selected : {}} onClick={() => { setSelectedTab(8); }}>Purchases</button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 2 ? styles.selected : {}} onClick={() => { setSelectedTab(2); }}>Bids</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 3 ? styles.selected : {}} onClick={() => { setSelectedTab(3); }}>Test Drives</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 4 ? styles.selected : {}} onClick={() => { setSelectedTab(4); }}>Customers</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 5 ? styles.selected : {}} onClick={() => { setSelectedTab(5); }}>Vehicle Listings</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button className="btn btn-block btn-dark" style={selectedTab === 6 ? styles.selected : {}} onClick={() => { setSelectedTab(6); }}>Sales Report</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          {user && (user.employeeType === "superAdmin") && (
            <Link to="/create-employee-account" className="btn btn-block btn-danger">Create Employee Acct.</Link>
          )}        </div>
        <div>
          <Link to="/add-new-vehicle" className="btn btn-block btn-danger">Add new Vehicle</Link>

        </div>

        <Button
            className="btn btn-block btn-danger "
            style={styles.bookApptButton}
            onClick={logOutUser}
            variant="contained"
          >
            Log Out
          </Button>
          
      </div>

      <div style={{ marginLeft: "200px", width: "calc(100% - 200px)" }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              {showTable ? (
                renderTable()
              ) : (
                <div style={styles.welcomeScreen}>
                  <h1 style={styles.welcomeScreenHeading}>Hi {user && user.first_name}.</h1>
                  <img src="logo512.png" alt="Logo" style={{ width: "200px", margin: "0 auto" }} />
                  <br />
                  <p style={styles.welcomeScreenText}>Click the button below to get started as {user && user.employeeType}.</p>
                  <button onClick={handleGetStarted} style={styles.welcomeScreenButton} className="btn btn-primary">Get Started</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );





};

export default ManagerPage;
