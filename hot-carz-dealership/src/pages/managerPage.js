import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, FORWARD_URL } from "../utilities/constants";
import VehicleImage from "../utilities/VehicleImage";
import Button from "@mui/material/Button";

import styles from "../css/employees.css";

// to-do
//delete_service_appointment
//edit_service_menu()
//assign_service_appointments

//technician
//technician_view_service_appointments
//technician edit

const ManagerPage = () => {
  const [setBids] = useState([]);
  const [vehicleListings, setVehicleListings] = useState([]);
  const [ /*serviceAppointments*/ setServiceAppointments] = useState([]);
  const [members, setMembers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [ /*purchases*/ setPurchases] = useState([]);
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [renderTable, setRenderTable] = useState(false); // Flag to control table rendering
  const [ /*testDrives*/ setTestDrives] = useState([]);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleTabSelect = (tabIndex) => {
    if (selectedTab !== tabIndex) {
      setSelectedTab(tabIndex);
      setRenderTable(true); // Set renderTable to true when a new tab is selected
    }
  };

  const renderTableCall = () => {
    if (renderTable) {
      return <RenderTable />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        const user = resp.data;
        setUser(user);
        // Store the session ID
        setSessionId(user.employeeID);
        // Check if user role is either "Manager" or "superAdmin"
        if (
          user.employeeType !== "Manager" &&
          user.employeeType !== "superAdmin"
        ) {
          throw new Error("Unauthorized access");
        }

        // Fetch service appointments and members data
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleGetStarted = () => {
    setShowWelcomeScreen(false);
    setShowTable(true);
    handleTabSelect(0);
  };

  const logOutUser = async () => {
    await httpClient.post(`${BASE_URL}/api/logout`);
    window.location.href = "/";
  };

  const fetchDataSelection = async (selectedTab) => {
    try {
      switch (selectedTab) {
        case 0:
          // Fetch Technicians
          const technicianResponse = await fetch(
            `${BASE_URL}/api/employees/technicians`
          );
          if (!technicianResponse.ok) {
            throw new Error("Failed to fetch technicians");
          }
          const techniciansData = await technicianResponse.json();
          console.log("Technicians fetched successfully:", techniciansData);
          // Update state variable with fetched data
          setTechnicians(techniciansData);

          const testDrivesResponse = await fetch(`${BASE_URL}/api/testdrives`);
          if (!testDrivesResponse.ok) {
            throw new Error("Failed to fetch test drives");
          }
          const testDrivesData = await testDrivesResponse.json();
          console.log("Test Drives fetched successfully:", testDrivesData);
          // Update state variable with fetched data
          setTestDrives(testDrivesData);

          const appointmentsResponse = await fetch(
            `${BASE_URL}/api/service-appointments`
          );
          if (!appointmentsResponse.ok) {
            throw new Error("Failed to fetch service appointments");
          }
          const appointmentsData = await appointmentsResponse.json();
          console.log(
            "Service Appointments fetched successfully:",
            appointmentsData
          );
          // Update state variable with fetched data
          setServiceAppointments(appointmentsData);

          const bidsResponse = await fetch(
            `${FORWARD_URL}/api/manager/current-bids`
          );
          if (!bidsResponse.ok) {
            throw new Error("Failed to fetch bids");
          }
          const bidsData = await bidsResponse.json();
          console.log("Bids fetched successfully:", bidsData);
          // Update state variable with fetched data
          setBids(bidsData);

          //Appointments that need to be assigned
          //Contract that need to be signed by manager
          //Bids that need to be accepted/ denied/ counter-bid
          //TEST DAMN DRIVES

          break;
        case 1:
          // Fetch service appointments
          const appointmentsResponse1 = await fetch(
            `${BASE_URL}/api/service-appointments`
          );
          if (!appointmentsResponse1.ok) {
            throw new Error("Failed to fetch service appointments");
          }
          const appointmentsData1 = await appointmentsResponse1.json();
          console.log(
            "Service Appointments fetched successfully:",
            appointmentsData1
          );
          // Update state variable with fetched data
          setServiceAppointments(appointmentsData1);
          break;
        case 2:
          // Fetch Bids
          const bidsResponse2 = await fetch(
            `${FORWARD_URL}/api/manager/current-bids`
          );
          if (!bidsResponse2.ok) {
            throw new Error("Failed to fetch bids");
          }
          const bidsData2 = await bidsResponse2.json();
          console.log("Bids fetched successfully:", bidsData2);
          // Update state variable with fetched data
          setBids(bidsData2);
          break;
        case 3:
          // Fetch Test Drives
          const testDrivesResponse3 = await fetch(`${BASE_URL}/api/testdrives`);
          if (!testDrivesResponse3.ok) {
            throw new Error("Failed to fetch test drives");
          }
          const testDrivesData3 = await testDrivesResponse3.json();
          console.log("Test Drives fetched successfully:", testDrivesData3);
          // Update state variable with fetched data
          setTestDrives(testDrivesData3);
          break;
        case 4:
          // Fetch members
          const membersResponse4 = await fetch(`${BASE_URL}/api/members`);
          if (!membersResponse4.ok) {
            throw new Error("Failed to fetch members");
          }
          const membersData4 = await membersResponse4.json();
          console.log("Members fetched successfully:", membersData4);
          // Update state variable with fetched data
          setMembers(membersData4);
          break;
        case 5:
          // Fetch Vehicle Listings
          const vehicleListingsResponse5 = await fetch(
            `${BASE_URL}/api/vehicles/search`
          );
          if (!vehicleListingsResponse5.ok) {
            throw new Error("Failed to fetch vehicle listings");
          }
          const vehicleListingsData5 = await vehicleListingsResponse5.json();
          console.log(
            "Vehicle Listings fetched successfully:",
            vehicleListingsData5
          );
          // Update state variable with fetched data
          setVehicleListings(vehicleListingsData5);
          break;
        case 6:
          return Promise.resolve();

        // Fetch Sales Report
        // Add your sales report fetching logic here
        case 7:
          // Fetch Technicians
          const technicianResponse7 = await fetch(
            `${BASE_URL}/api/employees/technicians`
          );
          if (!technicianResponse7.ok) {
            throw new Error("Failed to fetch technicians");
          }
          const techniciansData7 = await technicianResponse7.json();
          console.log("Technicians fetched successfully:", techniciansData7);
          // Update state variable with fetched data
          setTechnicians(techniciansData7);
          break;
        case 8:
          // Fetch Purchases
          const purchasesResponse8 = await fetch(
            `${FORWARD_URL}/api/purchases`
          );
          if (!purchasesResponse8.ok) {
            throw new Error("Failed to fetch purchases");
          }
          const purchasesData8 = await purchasesResponse8.json();
          setPurchases(purchasesData8.purchases); // Update purchases state here
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const assignTechnician = (appointmentId, technicianId, sessionId) => {
    // Create a JSON object with appointment_id, employee_id, and session_id
    const data = {
      appointment_id: appointmentId,
      employee_id: technicianId,
    };

    fetch(`${BASE_URL}/api/manager/assign-service-appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to assign technician to appointment");
        }
        // Handle success response here if needed

        console.log("Technician assigned successfully");
        return "Technician assigned successfully";
      })
      .catch((error) => {
        // Handle error here
        console.error("Error assigning technician:", error.message);
        return "Error assigning technician: " + error.message;
      });
  };

  const [selectedTab, setSelectedTab] = useState(null);

  const RenderTable = () => {
    console.log(selectedTab);
    switch (selectedTab) {
      case null:
        return (
          <WelcomeScreen user={user} handleGetStarted={handleGetStarted} />
        );
      case 0: // If "ALL" is selected, render all tables with borders
        return (
          <div style={styles.tableWrapper}>
            <TODO />
          </div>
        );
      case 1: // Render selected table with border
        return (
          <div style={styles.tableWrapper}>
            <ServiceCenter applyFilter={false} />
          </div>
        );
      case 2:
        return (
          <div style={styles.tableWrapper}>
            <BidsTable applyFilter={false} />
          </div>
        );
      case 3:
        return (
          <div style={styles.tableWrapper}>
            <TestDrivesTable applyFilter={false} />
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

      default:
        return null;
    }
  };

  const TODO = () => {
    // Get today's date
    const [selectedTab, setSelectedTab] = useState("");

    const renderSelectedTable = () => {
      switch (selectedTab) {
        case "serviceCenter":
          return <ServiceCenterForTODO />;
        case "testDrives":
          return <TestDrivesTable applyFilter={true} />;
        case "bids":
          return <BidsTable applyFilter={true} />;
        case "awaitingSignature":
          return <AwaitingSignature />;
        default:
          return null;
      }
    };

    return (
      <div>
        <div>
          <button
            className={
              selectedTab === "serviceCenter"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => setSelectedTab("serviceCenter")}
          >
            Service Appointments
          </button>
          <button
            className={
              selectedTab === "testDrives"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => setSelectedTab("testDrives")}
          >
            Test Drives
          </button>
          <button
            className={
              selectedTab === "bids"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => setSelectedTab("bids")}
          >
            Bids
          </button>
          <button
            className={
              selectedTab === "awaitingSignature"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => setSelectedTab("awaitingSignature")}
          >
            Awaiting Signature
          </button>
        </div>
        {renderSelectedTable()}
      </div>
    );
  };

  const AwaitingSignature = () => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [managerSignature, setManagerSignature] = useState("");
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [showReplacementModal, setShowReplacementModal] = useState(false);
    const [isSignatureEntered, setIsSignatureEntered] = useState(false);
    const [financeInfo, setFinanceInfo] = useState([]);
    const [vehicleInfo, setVehicleInfo] = useState({});
    const [memberInfo, setMemberInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetchContracts();
    }, []);

    const fetchContracts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/manager/signature-waiting`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contracts awaiting signature");
        }
        const data = await response.json();
        setContracts(data.purchases_waiting_signature);
      } catch (error) {
        console.error("Error fetching contracts:", error.message);
      }
      setIsLoading(false);
    };

    const handleViewContract = async (contract) => {
      setSelectedContract(contract);
      setShowSignatureModal(true);
      await fetchFinanceInfo(contract.memberID);
      await fetchVehicleAndMemberInfo(contract);
    };

    const fetchFinanceInfo = async (memberId) => {
      try {
        const response = await fetch(
          `${FORWARD_URL}/api/manager/get-financing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member_id: memberId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch finance information");
        }

        const financeData = await response.json();
        setFinanceInfo(financeData);
      } catch (error) {
        console.error("Error fetching finance information:", error.message);
      }
    };

    const fetchVehicleAndMemberInfo = async (appointment) => {
      try {
        const vehicleResponse = await fetch(
          `${BASE_URL}/api/vehicles?vin=${appointment.VIN_carID}&service=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!vehicleResponse.ok) {
          throw new Error("Failed to fetch vehicle information");
        }
        const vehicleData = await vehicleResponse.json();
        setVehicleInfo(vehicleData);

        const memberResponse = await fetch(
          `${BASE_URL}/api/manager/get_member`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ memberID: appointment.memberID }),
          }
        );
        if (!memberResponse.ok) {
          throw new Error("Failed to fetch member information");
        }
        const memberData = await memberResponse.json();
        setMemberInfo(memberData);
      } catch (error) {
        console.error(
          "Error fetching vehicle and member information:",
          error.message
        );
      }
    };

    const handleSubmitSignature = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/manager/signature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            purchaseID: selectedContract.purchaseID,
            signature: "Yes",
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update signature");
        }
        setShowSignatureModal(false);
        setShowReplacementModal(true);
        // Refetch awaiting signature contracts after successful update
        fetchContracts();
      } catch (error) {
        console.error("Error updating signature:", error.message);
      }
    };

    const closeModal = () => {
      setShowSignatureModal(false);
      setShowReplacementModal(false);
      setManagerSignature("");
    };

    return (
      <div>
        <h2>Contracts Awaiting Manager Signature</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>VIN Car ID</th>
              <th>Purchase Type</th>
              <th>Purchase Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? ( // Check if loading
              <tr>
                <td colSpan="4">Loading Contracts...</td>
              </tr>
            ) : (
              <>
                {contracts.map((contract) => (
                  <tr key={contract.purchaseID}>
                    <td>{contract.VIN_carID}</td>
                    <td>{contract.purchaseType}</td>
                    <td>{contract.purchaseDate}</td>
                    <td>
                      <button
                        onClick={() => handleViewContract(contract)}
                        className="btn btn-primary "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {contracts.length === 0 && (
                  <tr>
                    <td colSpan="4">No contracts awaiting manager signature</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>

        {showSignatureModal && selectedContract && (
          <div className="modal-container">
            {/* Signature Modal */}
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contract Details</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Display contract details */}
                  <p>VIN Car ID: {selectedContract.VIN_carID}</p>
                  <p>Purchase Type: {selectedContract.purchaseType}</p>
                  <p>Purchase Date: {selectedContract.purchaseDate}</p>
                  {/* Display finance information */}
                  {financeInfo.length > 0 && (
                    <div>
                      <h5>Finance Information</h5>
                      <p>Credit Score: {financeInfo[0].credit_score}</p>
                      <p>Income: ${financeInfo[0].income}</p>
                      <p>Down Payment: ${financeInfo[0].down_payment}</p>
                      <p>Loan Total: ${financeInfo[0].loan_total}</p>
                      <p>Percentage: {financeInfo[0].percentage}%</p>
                      <p>Remaining Months: {financeInfo[0].remaining_months}</p>
                    </div>
                  )}
                  {/* Display vehicle information */}
                  {vehicleInfo && (
                    <div>
                      <h5>Vehicle Information</h5>
                      <p>Vin: {vehicleInfo.VIN_carID}</p>

                      <p>Make: {vehicleInfo.make}</p>
                      <p>Model: {vehicleInfo.model}</p>
                      <p>Body: {vehicleInfo.body}</p>
                      <p>Color: {vehicleInfo.color}</p>
                      <p>Price: ${vehicleInfo.price}</p>
                      <p>Year: {vehicleInfo.year}</p>
                      <p>Mileage: {vehicleInfo.mileage}</p>
                    </div>
                  )}
                  {/* Display member information */}
                  {memberInfo && (
                    <div>
                      <h5>Member Information</h5>
                      <p>
                        Name: {memberInfo.first_name} {memberInfo.last_name}
                      </p>
                      <p>Email: {memberInfo.email}</p>
                      <p>
                        Address: {memberInfo.address}, {memberInfo.city},{" "}
                        {memberInfo.state}, {memberInfo.zipcode}
                      </p>
                      <p>Phone: {memberInfo.phone}</p>
                    </div>
                  )}


                  {/* Signature input field */}
                  <div className="form-group">
                    <label htmlFor="signature">Manager's Signature:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="signature"
                      placeholder="Enter Signature"
                      value={managerSignature}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        const expectedSignature = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
                        setIsSignatureEntered(inputValue.trim().toLowerCase() === expectedSignature);
                        setManagerSignature(inputValue);
                      }}
                    />
                    <small className="form-text text-muted">
                      By signing this, you are accepting the contract.
                    </small>
                    {managerSignature && !isSignatureEntered && (
                      <p style={{ color: "red" }}>
                        Please enter your first and last name.
                      </p>
                    )}
                  </div>






                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitSignature}
                    disabled={!isSignatureEntered}
                  >
                    Confirm Signature
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showReplacementModal && (
          <div className="modal-container">
            {/* Replacement Modal */}
            {/* Display confirmation message */}
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Signature Confirmed</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Your signature has been confirmed.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const ServiceCenter = () => {
    const [services, setServices] = useState([]);
    const [newServiceName, setNewServiceName] = useState("");
    const [newServicePrice, setNewServicePrice] = useState("");
    const [serviceAppointments, setServiceAppointments] = useState([]);
    const [,/*technicians*/ setTechnicians] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedName, setEditedName] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [editedService, setEditedService] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const [page, setPage] = useState(0); // Current page number
    const pageSize = 10; // Number of service appointments per page

    useEffect(() => {
      fetchServiceAppointments();
      fetchServices();
      fetchTechnicians(); // Moved inside useEffect
    }, []);
  
    const fetchTechnicians = async () => { // Defined inside useEffect
      try {
        const response = await fetch(`${BASE_URL}/api/employees/technicians`);
        if (!response.ok) {
          throw new Error("Failed to fetch technicians");
        }
        const data = await response.json();
        setTechnicians(data);
      } catch (error) {
        console.error("Error fetching technicians:", error.message);
      }
    };
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/service-menu`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    const fetchServiceAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/api/service-appointments`);
        if (!response.ok) {
          throw new Error("Failed to fetch service appointments");
        }
        const data = await response.json();
        setServiceAppointments(data);
      } catch (error) {
        console.error("Error fetching service appointments:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleAddService = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/manager/edit-service-menu`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              edit_or_add: 1,
              service_name: newServiceName,
              price: newServicePrice,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add service");
        }
        await fetchServices();
        setNewServiceName("");
        setNewServicePrice("");
      } catch (error) {
        console.error("Error adding service:", error.message);
      }
    };

    const handleDeleteService = async (serviceID) => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/manager/edit-service-menu`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ service_id: serviceID }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete service");
        }
        await fetchServices();
        setShowEditModal(false);
      } catch (error) {
        console.error("Error deleting service:", error.message);
        setDeleteError(true);
      }
    };

    const updateService = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/manager/edit-service-menu`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              edit_or_add: 2,
              serviceID: editedService.serviceID,
              service_name: editedName,
              price: editedPrice,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update service");
        }
        await fetchServices();
      } catch (error) {
        console.error("Error updating service:", error.message);
      }
      setShowEditModal(false);
    };

    const handleEditService = (service) => {
      setEditedService(service);
      setEditedName(service.service_name);
      setEditedPrice(service.price);
      setShowEditModal(true);
    };

    // Function to handle pagination
    const nextPage = () => {
      setPage(page + 1);
    };

    const prevPage = () => {
      setPage(page - 1);
    };

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return (
      <div>
        {/* Service Appointments */}
        <div className="table-responsive" style={styles.tableHeight}>
          <h2>Service Appointments</h2>
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={prevPage}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={serviceAppointments.length <= endIndex}
            >
              Next
            </button>
          </div>
          <table
            className="table table-bordered table-striped"
            style={styles.tableHeight}
          >
            <thead className="thead-dark">
              <tr>
                <th>Appointment Date</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                serviceAppointments
                  .sort(
                    (a, b) =>
                      new Date(b.appointment_date) -
                      new Date(a.appointment_date)
                  ) // Sort appointments by date (from most recent to oldest)
                  .slice(startIndex, endIndex)
                  .map((appointment) => (
                    <tr key={appointment.appointment_id}>
                      <td>{appointment.appointment_date}</td>
                      <td>{appointment.service_name}</td>
                      <td>{appointment.status}</td>
                      <td>{appointment.comments}</td>{" "}
                      {/* New column for comments */}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5">Loading service appointments...</td>
                </tr>
              )}
              {!isLoading && serviceAppointments.length === 0 && (
                <tr>
                  <td colSpan="5">No service appointments available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Add Service */}
        <h2>Add Service</h2>
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
        {/* Current Available Services */}
        <h2>Current Available Services</h2>
        <table
          className="table table-bordered table-striped"
          style={styles.tableHeight}
        >
          <thead className="thead-dark">
            <tr>
              <th>Service Name</th>
              <th>Service Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.serviceID}>
                <td>{service.service_name}</td>
                <td>{service.price}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEditService(service)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit Service Modal */}
        {showEditModal && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Service</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <label htmlFor="editedName">Service Name:</label>
                    <input
                      id="editedName"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="editedPrice">Service Price:</label>
                    <input
                      id="editedPrice"
                      type="text"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  {deleteError && (
                    <p className="text-danger">
                      Cannot delete this service. (Hint: You may still have
                      outstanding warranties on this service and must honor
                      them.)
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateService}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteService(editedService.serviceID)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ServiceCenterForTODO = () => {
    const [scheduledServiceAppointments, setScheduledServiceAppointments] =
      useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [showTechnicianWarning, setShowTechnicianWarning] = useState(false);
    const [showReplacementModal, setShowReplacementModal] = useState(false);
    const [assignmentMessage, setAssignmentMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [vehicleInfo, setVehicleInfo] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);

    useEffect(() => {
      fetchScheduledServiceAppointments();
      fetchTechnicians();
    }, []);

    const fetchScheduledServiceAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/pending-service-appointments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pending service appointments");
        }
        const data = await response.json();
        setScheduledServiceAppointments(data);
      } catch (error) {
        console.error(
          "Error fetching pending service appointments:",
          error.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTechnicians = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/employees/technicians`);
        if (!response.ok) {
          throw new Error("Failed to fetch technicians");
        }
        const data = await response.json();
        setTechnicians(data);
      } catch (error) {
        console.error("Error fetching technicians:", error.message);
      }
    };
    const fetchVehicleAndMemberInfo = async (appointment) => {
      try {
        const vehicleResponse = await fetch(
          `${BASE_URL}/api/vehicles?vin=${appointment.VIN_carID}&service=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!vehicleResponse.ok) {
          throw new Error("Failed to fetch vehicle information");
        }
        const vehicleData = await vehicleResponse.json();
        setVehicleInfo(vehicleData);

        const memberResponse = await fetch(
          `${BASE_URL}/api/manager/get_member`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ memberID: appointment.memberID }),
          }
        );
        if (!memberResponse.ok) {
          throw new Error("Failed to fetch member information");
        }
        const memberData = await memberResponse.json();
        setMemberInfo(memberData);
      } catch (error) {
        console.error(
          "Error fetching vehicle and member information:",
          error.message
        );
      }
    };

    const handleTechnicianChange = (event) => {
      setSelectedTechnician(event.target.value);
    };

    const confirmTechnician = async () => {
      if (selectedTechnician) {
        try {
          const message = await assignTechnician(
            selectedAppointment.appointment_id,
            selectedTechnician,
            sessionId
          );
          setAssignmentMessage(message);
          setShowReplacementModal(true);
          await fetchScheduledServiceAppointments();
        } catch (error) {
          setAssignmentMessage("Error assigning technician: " + error.message);
          setShowReplacementModal(true); // Still show modal to display error message
        }
      } else {
        setShowTechnicianWarning(true); // Show the warning text
      }
    };

    const openModal = (appointment) => {
      setSelectedAppointment(appointment);
      fetchVehicleAndMemberInfo(appointment);
    };

    const closeModal = () => {
      setSelectedAppointment(null);
      setVehicleInfo(null);
      setMemberInfo(null);
      setSelectedTechnician(null);
      setShowReplacementModal(false);
    };

    return (
      <div>
        <div className="table-responsive" style={styles.tableHeight}>
          <h2>Scheduled Service Appointments</h2>
          <table
            className="table table-bordered table-striped"
            style={styles.tableHeight}
          >
            <thead className="thead-dark">
              <tr>
                <th>Appointment Date</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4">Loading scheduled appointments...</td>
                </tr>
              ) : scheduledServiceAppointments.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    No scheduled service appointments available
                  </td>
                </tr>
              ) : (
                scheduledServiceAppointments.map((appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.service_name}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button
                        onClick={() => openModal(appointment)}
                        className="btn btn-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedAppointment && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Appointment Details</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Appointment Date: {selectedAppointment.appointment_date}
                  </p>
                  <p>Service Type: {selectedAppointment.service_name}</p>
                  <p>Status: {selectedAppointment.status}</p>
                  {vehicleInfo && (
                    <div>
                      <h5>Vehicle Information</h5>
                      <p>VIN: {vehicleInfo.VIN_carID}</p>
                      <p>Make: {vehicleInfo.make}</p>
                      <p>Model: {vehicleInfo.model}</p>
                      <p>Year: {vehicleInfo.year}</p>
                      <p>Color: {vehicleInfo.color}</p>
                      {/* Add more vehicle info fields as needed */}
                    </div>
                  )}
                  {memberInfo && (
                    <div>
                      <h5>Member Information</h5>
                      <p>
                        Name: {memberInfo.first_name} {memberInfo.last_name}
                      </p>
                      <p>Email: {memberInfo.email}</p>
                      <p>Phone: {memberInfo.phone}</p>
                      <p>Address: {memberInfo.address}</p>
                      {/* Add more member info fields as needed */}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <label htmlFor="technician">Select Technician:</label>
                  <select
                    id="technician"
                    value={selectedTechnician}
                    onChange={handleTechnicianChange}
                  >
                    <option value="-">-</option>
                    {technicians.map((technician) => (
                      <option
                        key={technician.employeeID}
                        value={technician.employeeID}
                      >
                        {technician.first_name} {technician.last_name}
                      </option>
                    ))}
                  </select>
                  {showTechnicianWarning && (
                    <span style={{ color: "red" }}>
                      Please select a technician
                    </span>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={confirmTechnician}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showReplacementModal && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Service Status</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Service Type: {selectedAppointment.service_name}</p>
                  {assignmentMessage && <p>{assignmentMessage}</p>}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TechnicianTable = () => {
    return (
      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Technicians Management</h2>
        <table
          className="table table-bordered table-striped"
          style={styles.tableHeight}
        >
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
            {technicians &&
              technicians.map((technician) => (
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
  const BidsTable = ({ applyFilter }) => {
    const [bids, setBids] = useState([]);
    const [selectedBid, setSelectedBid] = useState(null);
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    const [showReplacementModal, setShowReplacementModal] = useState(false);
    const [isSignatureEntered, setIsSignatureEntered] = useState(false);
    const [managerSignature, setManagerSignature] = useState("");

    const [member, setMember] = useState(false);
    const [counterOfferAmount, setCounterOfferAmount] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetchCurrentBids();
    }, []);

    const fetchCurrentBids = async () => {
      try {
        const response = await fetch(`${FORWARD_URL}/api/manager/current-bids`);
        if (!response.ok) {
          throw new Error("Failed to fetch current bids");
        }
        const bidData = await response.json();
        setBids(bidData);
      } catch (error) {
        console.error("Error fetching current bids:", error.message);
      }
      setIsLoading(false);
    };


    const handleBidConfirmation = async (bidId, confirmationStatus) => {
      try {
        const response = await fetch(
          `${FORWARD_URL}/api/manager/current-bids`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bidID: bidId,
              confirmationStatus: 'Member Processing',
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update bid status");
        }
        await fetchCurrentBids();
        setConfirmationStatus(confirmationStatus);
        setShowReplacementModal(true);
      } catch (error) {
        console.error("Error updating bid status:", error.message);
      }
      console.log("Updated Status of Bid. " + confirmationStatus);
    };

    const getBidColor = (bid) => {
      const percentage = (bid.bidValue / bid.MSRP) * 100;
      if (percentage < 10) {
        return "green";
      } else if (percentage >= 10 && percentage <= 20) {
        return "orange";
      } else {
        return "red";
      }
    };

    const handleViewBid = async (bid) => {
      setSelectedBid(bid);
      await fetchMemberInfo(bid.memberID);
    };

    const closeModal = () => {
      setSelectedBid(null);
      setMember([]);
      setShowReplacementModal(false);
      setConfirmationStatus(null);
      setCounterOfferAmount("");
    };

    const handleCounterBidOffer = async () => {
      try {
        const response = await fetch(
          `${FORWARD_URL}/api/manager/counter_bid_offer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bidID: selectedBid.bidID,
              newOfferPrice: counterOfferAmount,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update bid offer price");
        }
        await fetchCurrentBids();
        setShowReplacementModal(true);
      } catch (error) {
        console.error("Error updating bid offer price:", error.message);
      }
    };

    const fetchMemberInfo = async (memberID) => {
      try {
        const memberResponse = await fetch(
          `${BASE_URL}/api/manager/get_member`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ memberID }),
          }
        );
        if (!memberResponse.ok) {
          throw new Error("Failed to fetch member information");
        }
        const memberData = await memberResponse.json();
        setMember(memberData);
      } catch (error) {
        console.error("Error fetching member information:", error.message);
      }
    };
    

    return (
      <div>
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
              {isLoading ? ( // Check if loading
                <tr>
                  <td colSpan="7">Loading Bids...</td>
                </tr>
              ) : (
                <>
                  {bids &&
                    bids
                      .filter((bid) =>
                        applyFilter ? bid.bidStatus === "Processing" : true
                      )
                      .map((bid, index) => (
                        <tr key={index}>
                          <td>{bid.make}</td>
                          <td>{bid.model}</td>
                          <td>{bid.VIN}</td>
                          <td>{bid.MSRP}</td>
                          <td style={{ color: getBidColor(bid) }}>
                            {bid.bidValue}
                          </td>
                          <td>{bid.bidStatus}</td>
                          <td>
                            {bid.bidStatus === "Processing" && (
                              <button
                                onClick={() => handleViewBid(bid)}
                                className="btn btn-primary"
                              >
                                View
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  {!bids && (
                    <tr>
                      <td colSpan="7">No bids available</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal for viewing bid details */}
        {selectedBid && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Bid Details</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Display bid details here */}
                  <p>Make: {selectedBid.make}</p>
                  <p>Model: {selectedBid.model}</p>
                  <p>VIN: {selectedBid.VIN}</p>
                  <p>MSRP: {selectedBid.MSRP}</p>
                  <p style={{ color: getBidColor(selectedBid.bidValue) }}>
                    {" "}
                    Bid Amount: {selectedBid.bidValue}{" "}
                    {(
                      ((selectedBid.bidValue - selectedBid.MSRP) /
                        selectedBid.MSRP) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                  <p>Status: {selectedBid.bidStatus}</p>
                  <p>Member: {member.first_name} {member.last_name}</p>

                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Offer Amount"
                      value={counterOfferAmount}
                      onChange={(e) => setCounterOfferAmount(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCounterBidOffer}
                      disabled={!counterOfferAmount.trim()}
                    >
                      Send Counter Offer
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                <div className="form-group">
    <label htmlFor="signature">Employee's Signature:</label>
    <input
      type="text"
      className="form-control"
      id="signature"
      placeholder="Enter Signature"
      value={managerSignature}
      onChange={(event) => {
        const inputValue = event.target.value;
        const expectedSignature = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
        setIsSignatureEntered(inputValue.trim().toLowerCase() === expectedSignature);
        setManagerSignature(inputValue);
      }}
    />
    <small className="form-text text-muted">
      By signing this, you are accepting the proposed bid and
      are entering into a contract with this member.
    </small>
    {managerSignature && !isSignatureEntered && (
      <p style={{ color: "red" }}>
        Please enter your first and last name.
      </p>
    )}
  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleBidConfirmation(selectedBid.bidID, "Confirmed")
                    }
                    disabled={!isSignatureEntered} // Disable button if signature is not provided
                  >
                    Accept Bid
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      handleBidConfirmation(selectedBid.bidID, "Denied")
                    }
                  >
                    Deny Bid
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showReplacementModal && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Bid Status</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {counterOfferAmount && (
                    <div>
                      <p>Action: Counter Bid</p>
                      <p>Counter Offer Amount: {counterOfferAmount}</p>
                    </div>
                  )}
                  {/* Display bid status information here */}
                  <p>
                    Bid Status: {confirmationStatus || selectedBid.bidStatus}
                  </p>
                  {selectedBid && (
                    <div>
                      <p>Make: {selectedBid.make}</p>
                      <p>Model: {selectedBid.model}</p>
                      {/* Add more bid details as needed */}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  const TestDrivesTable = ({ applyFilter }) => {
    // Function to fetch pending test drives
    const fetchPendingTestDrives = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/pending_testdrives`);
        if (!response.ok) {
          throw new Error("Failed to fetch pending test drives");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching pending test drives:", error.message);
        // Handle error
      }
    };

    // State to store test drives data
    const [testDrives, setTestDrives] = useState([]);
    const [selectedTestDrive, setSelectedTestDrive] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(true); // State for loading indicator

    // Fetch test drives data when component mounts

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true); // Set loading to true while fetching
          const data = applyFilter
            ? await fetchPendingTestDrives()
            : await fetchDataSelection(3);
          setTestDrives(data);
        } catch (error) {
          console.error("Error fetching test drives:", error.message);
        } finally {
          setIsLoading(false); // Set loading to false after fetching
        }
      };
      fetchData();
    }, [applyFilter]);

    // Function to handle confirmation update
    const handleConfirmationUpdate = async (testDriveId, confirmationValue) => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/testdrives/update_confirmation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              testdrive_id: testDriveId,
              confirmation: confirmationValue,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update confirmation");
        }
        // Refresh data after successful update
        fetchDataSelection(3);
        // Implement a function to fetch data again from the server and update state
      } catch (error) {
        console.error("Error updating confirmation:", error.message);
        // Handle error
      }
    };

    // Function to handle modal open
    const handleModalOpen = (testDrive) => {
      setSelectedTestDrive(testDrive);
      setShowModal(true);
    };

    // Function to handle modal close
    const handleModalClose = () => {
      setSelectedTestDrive(null);
      setShowModal(false);
    };

    const handleConfirmation = async (confirmation) => {
      try {
        await handleConfirmationUpdate(selectedTestDrive.id, confirmation);
        setShowModal(false); // Close modal after confirmation
        // Call the API again to fetch the latest test drive data
        const data = applyFilter
          ? await fetchPendingTestDrives()
          : await fetchDataSelection(3);
        setTestDrives(data);
        // Show replacement modal describing the choice made
        // Implement replacement modal logic here
      } catch (error) {
        console.error("Error handling confirmation:", error.message);
        // Handle error
      }
    };

    return (
      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Test Drives</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Customer Phone</th>
              <th>Full Name</th>
              <th>Vehicle</th>
              <th>Datetime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {testDrives.length === 0 && !isLoading && (
              <tr>
                <td colSpan="5">No test drives available</td>
              </tr>
            )}
            {isLoading && (
              <tr>
                <td colSpan="5">Loading test drives...</td>
              </tr>
            )}
            {!isLoading &&
              testDrives.map((testDrive, index) => (
                <tr key={index}>
                  <td>{testDrive.phone}</td>
                  <td>{testDrive.fullname}</td>
                  <td>{testDrive.car_make_model}</td>
                  <td>{testDrive.appointment_date}</td>
                  <td>
                    {/* Button to view details and confirm/cancel */}
                    <button
                      onClick={() => handleModalOpen(testDrive)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Modal for displaying test drive details and confirmation */}
        {showModal && (
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Test Drive Details</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={handleModalClose}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Customer Phone: {selectedTestDrive.phone}</p>
                  <p>Full Name: {selectedTestDrive.fullname}</p>
                  <p>Vehicle: {selectedTestDrive.car_make_model}</p>
                  <p>Datetime: {selectedTestDrive.appointment_date}</p>
                  {/* Add more details as needed */}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={() => handleConfirmation(1)}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleConfirmation(3)}
                  >
                    Cancel Test Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CustomersTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize /*setPageSize*/] = useState(10);
    const [zipcodeFilter, setZipcodeFilter] = useState("");
    const [sortingOption, setSortingOption] = useState("recent");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [financeInfo, setFinanceInfo] = useState([]);

    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members"); // Assuming your frontend and backend are served from the same origin
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error.message);
      }
    };
    useEffect(() => {
      fetchMembers();
    }, [currentPage, pageSize]);

    // Function to handle moving to the next page
    const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };

    // Function to handle moving to the previous page
    const prevPage = () => {
      setCurrentPage(currentPage - 1);
    };

    const handleViewFinancial = async (customer) => {
      setSelectedCustomer(customer);
      await fetchFinanceInfo(customer.memberID);

      setShowModal(true);
    };

    // Check if members is null before applying any operations
    // Check if members is null before applying any operations
    const filteredMembers =
      members &&
      members.filter(
        (member) => member.zipcode && member.zipcode.includes(zipcodeFilter)
      );

    const sortedMembers =
      filteredMembers &&
      filteredMembers.sort((a, b) => {
        if (sortingOption === "recent") {
          return new Date(b.join_date) - new Date(a.join_date);
        } else if (sortingOption === "oldest") {
          return new Date(a.join_date) - new Date(b.join_date);
        } else {
          return a.first_name.localeCompare(b.first_name);
        }
      });

    const fetchFinanceInfo = async (memberId) => {
      try {
        const response = await fetch(
          `${FORWARD_URL}/api/manager/get-financing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member_id: memberId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch finance information");
        }

        const financeData = await response.json();
        setFinanceInfo(financeData);
      } catch (error) {
        console.error("Error fetching finance information:", error.message);
      }
    };

    // Calculate the starting and ending indexes for the current page
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return (
      <div>
        <div>
          <label htmlFor="zipcodeFilter">Zipcode:</label>
          <input
            type="text"
            id="zipcodeFilter"
            value={zipcodeFilter}
            onChange={(e) => setZipcodeFilter(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sortingOption">Sort by:</label>
          <select
            id="sortingOption"
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className="table-responsive" style={{ ...styles.tableHeight }}>
          <h2>Customers</h2>
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={endIndex >= sortedMembers.length}
            >
              Next
            </button>
          </div>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone #</th>
                <th>Email</th>
                <th>Action</th> {/* New column for Action */}
              </tr>
            </thead>
            <tbody>
              {sortedMembers
                .slice(startIndex, endIndex)
                .map((member, index) => (
                  <tr key={index}>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewFinancial(member)}
                      >
                        View Financial
                      </button>
                    </td>
                  </tr>
                ))}
              {!sortedMembers.length && (
                <tr>
                  <td colSpan="6">No customers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Customer Financial Stub</h5>
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                </div>
                <div className="modal-body">
                  <h2>Customer Information</h2>
                  <p>First Name: {selectedCustomer.first_name}</p>
                  <p>Last Name: {selectedCustomer.last_name}</p>
                  <p>Phone #: {selectedCustomer.phone}</p>
                  <p>Email: {selectedCustomer.email}</p>
                  {/* Add more customer information as needed */}

                  {financeInfo.length > 0 && (
                    <div>
                      <h5>Finance Information</h5>

                      <p>Income: {financeInfo[0].income}</p>
                      <p>Credit Score: {financeInfo[0].credit_score}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const VehicleListingsTable = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [editedVehicle, setEditedVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(0); // Current page number
    const pageSize = 15; // Number of vehicles per page

    const fetchVehicleListings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/vehicles/search`);
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle listings");
        }
        const data = await response.json();
        setVehicleListings(data);
      } catch (error) {
        console.error("Error fetching vehicle listings:", error.message);
      }
    };

    const handleEditVehicle = (vehicle) => {
      setSelectedVehicle(vehicle);
      setEditedVehicle(vehicle); // Initialize edited vehicle with the selected vehicle data
      setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedVehicle({ ...editedVehicle, [name]: value });
    };

    const handleSubmit = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/vehicles/edit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedVehicle),
        });
        if (!response.ok) {
          throw new Error("Failed to update vehicle");
        }
        fetchVehicleListings();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating vehicle:", error.message);
      }
    };

    const handleDeleteVehicle = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/vehicles/edit`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ VIN_carID: editedVehicle.VIN_carID }), // Pass the VIN of the edited vehicle
        });
        if (!response.ok) {
          throw new Error("Failed to delete vehicle");
        }
        setIsModalOpen(false);
        fetchVehicleListings(); // Fetch vehicle listings again after deletion
      } catch (error) {
        console.error("Error deleting vehicle:", error.message);
      }
    };
    const closeModal = () => {
      setSelectedVehicle(null);
      setEditedVehicle(null);
      setIsModalOpen(false);
    };

    // Function to handle pagination
    const nextPage = () => {
      setPage(page + 1);
    };

    const prevPage = () => {
      setPage(page - 1);
    };

    // Calculate the start and end indexes based on the current page
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return (
      <div>
        <div className="table-responsive" style={styles.tableHeight}>
          <h2>Vehicle Listings</h2>
          {/* Pagination arrows */}
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={prevPage}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={vehicleListings.length <= endIndex}
            >
              Next
            </button>
          </div>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Page Views</th>
                <th>Price</th>
                <th>Status</th>
                <th>Image</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {vehicleListings &&
                vehicleListings
                  .slice(startIndex, endIndex)
                  .map((vehicle, index) => (
                    <tr key={index}>
                      <td>{vehicle.make}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.year}</td>
                      <td>{vehicle.viewsOnPage}</td>
                      <td>{vehicle.price}</td>
                      <td>{vehicle.status}</td>
                      <td>
                        <VehicleImage
                          className="w-[150px] "
                          vin={vehicle.VIN_carID}
                          bodyType={vehicle.body}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => handleEditVehicle(vehicle)}
                        >
                          Edit
                        </button>
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

        {/* Modal for editing vehicle details */}
        {isModalOpen && selectedVehicle && (
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Vehicle Details</h5>

                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={handleDeleteVehicle}
                >
                  Delete
                </button>

                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="make">Make:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="make"
                      value={editedVehicle.make}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      value={editedVehicle.model}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="year"
                      value={editedVehicle.year}
                      onChange={handleInputChange}
                      pattern="\d{4}"
                    />
                    {/* Regex pattern ensures year is in YYYY format */}
                    <small className="form-text text-danger">
                      {!/^\d{4}$/.test(editedVehicle.year) &&
                        "Year must be in YYYY format"}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={editedVehicle.price}
                      onChange={handleInputChange}
                      pattern="\d+(\.\d{2})?"
                    />
                    {/* Regex pattern ensures price is in format x.xx */}
                    <small className="form-text text-danger">
                      {!/^\d+(\.\d{2})?$/.test(editedVehicle.price) &&
                        "Price must be in format x.xx"}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="mileage">Mileage:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mileage"
                      value={editedVehicle.mileage}
                      onChange={handleInputChange}
                      pattern="\d+"
                    />
                    {/* Regex pattern ensures mileage is a positive integer */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                      className="form-control"
                      name="status"
                      value={editedVehicle.status}
                      onChange={handleInputChange}
                    >
                      <option value="new">New</option>
                      <option value="being-watched">Being Watched</option>
                      <option value="low-milage">Low Milage</option>
                    </select>
                  </div>

                  {/* Add input fields for other attributes */}

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={editedVehicle.description}
                      onChange={handleInputChange}
                      rows="4"
                    />
                  </div>

                  {/* Add input fields for other attributes */}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const SalesReportTable = () => {
    const [salesReport, setSalesReport] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [totalSales, setTotalSales] = useState("");
    const [showReport, setShowReport] = useState(false); // State to control the visibility of the report

    const [total_all_time_sales, setTotalAllTimeSales] = useState(null);
    const [total_yearly_sales, setTotalYearlySales] = useState(null);
    const [total_last_year_sales, setTotalLastYearSales] = useState(null);
    const [total_last_year_month_sales, setTotalLastYearMonthSales] =
      useState(null);

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
        alert("Please select both month and year.");
        return;
      }

      try {
        // Send a GET request to your backend API with selected month and year
        const response = await fetch(
          `${FORWARD_URL}/api/manager/monthly-sales-report?month=${selectedMonth}&year=${selectedYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sales report");
        }

        const data = await response.json();
        // Set sales report in state, sorted by purchase timestamp (most recent first)
        setSalesReport(
          data.sales_report.sort(
            (a, b) =>
              new Date(b.purchase_timestamp) - new Date(a.purchase_timestamp)
          )
        );
        // Set total sales in the state
        setTotalSales(data.total_sales);

        setTotalAllTimeSales(data.all_time_sales);
        setTotalYearlySales(data.total_this_year);
        setTotalLastYearSales(data.last_year_sales);
        setTotalLastYearMonthSales(data.last_year_month_sales);

        setShowReport(true);
      } catch (error) {
        console.error("Error fetching sales report:", error.message);
      }
    };

    return (
      <div className="table-responsive" style={styles.tableHeight}>
        <h2>Sales Report</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="month">Month:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
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
            <label htmlFor="year"> Year:</label>
            <select id="year" value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              <option value="2024">2024</option>

              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
            <button type="submit" className="btn btn-success">
              Generate Report
            </button>
          </div>
        </form>

        {showReport && salesReport.length > 0 ? (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <td colSpan="2">Total Sales All Time:</td>
                <td>{total_all_time_sales}</td>
              </tr>
              <tr>
                <td colSpan="2">Total Yearly Sales {selectedYear}:</td>
                <td>{total_yearly_sales}</td>
                <td colSpan="2">Compared to last year {selectedYear - 1}:</td>
                <td>{total_last_year_sales}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  Total Sales {selectedMonth}-{selectedYear}:
                </td>
                <td>{totalSales}</td>
                <td colSpan="2">
                  Compared to last year {selectedMonth}-{selectedYear - 1}:
                </td>
                <td>{total_last_year_month_sales}</td>
              </tr>

              <tr>
                <th>Date</th>
                <th>Purchase Type</th>
                <th>Confirmation #</th>
                <th>Vehicle VIN</th>
                <th>Income</th>
              </tr>
            </thead>
            <tbody>
              {salesReport.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.purchase_timestamp}</td>
                  <td>{sale.purchase_type}</td>
                  <td>{sale.confirmation_number}</td>
                  <td>{sale.vehicle_id}</td>
                  <td>{sale.bid_value}</td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        ) : (
          <p>No sales report available</p>
        )}
      </div>
    );
  };

  // Define the WelcomeScreen component
  const WelcomeScreen = ({ user, handleGetStarted }) => (
    <div className="welcomeScreen">
      <h1 className="welcomeScreenHeading">Hi {user && user.first_name}.</h1>
      <img src="carzoom.gif" alt="Logo" className="welcomeScreenLogo" />
      <br />
      <p className="welcomeScreenText">
        Click the button below to get started as {user && user.employeeType}.
      </p>
      <button
        onClick={handleGetStarted}
        className="welcomeScreenButton btn btn-primary"
      >
        Get Started
      </button>
    </div>
  );

  return (
    <div>
      {!showWelcomeScreen && (
        <div className="bg-dark text-white p-3 flex w-auto"
          style={{
            height: "100vh",
            overflowY: "auto",
            position: "fixed",
            left: 0,
            flexDirection: "column",
          }}>
          <div style={{ marginBottom: "10px" }}>
            <button
              className={`btn btn-block btn-dark ${selectedTab === 0 ? "selected" : ""
                }`}
              onClick={() => handleTabSelect(0)}
            >
              To-Do's
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <button
              className={`btn btn-block btn-dark ${selectedTab === 1 ? "selected" : ""
                }`}
              onClick={() => {
                handleTabSelect(1);
                console.log("Clicked on Service Center button");
              }}
            >
              Service Center
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <button
              className={`btn btn-block btn-dark ${selectedTab === 4 ? "selected" : ""
                }`}
              onClick={() => {
                handleTabSelect(4);
                fetchDataSelection(4);
              }}
            >
              Customers
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <button
              className={`btn btn-block btn-dark ${selectedTab === 5 ? "selected" : ""
                }`}
              onClick={() => {
                handleTabSelect(5);
                fetchDataSelection(5);
              }}
            >
              Vehicle Listings
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <button
              className={`btn btn-block btn-dark ${selectedTab === 6 ? "selected" : ""
                }`}
              onClick={() => {
                handleTabSelect(6);
                fetchDataSelection(6);
              }}
            >
              Sales Report
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <button
              className={`btn btn-block btn-dark ${selectedTab === 7 ? "selected" : ""
                }`}
              onClick={() => {
                handleTabSelect(7);
                fetchDataSelection(7);
              }}
            >
              Technicians
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            {user && user.employeeType === "superAdmin" && (
              <Link
                to="/create-employee-account"
                className="btn btn-block btn-danger"
              >
                Create Employee Acct.
              </Link>
            )}
          </div>
          <div>
            <Link to="/add-new-vehicle" className="btn btn-block btn-danger">
              Add new Vehicle
            </Link>
          </div>
          <br />
          <Button
            className="btn btn-block btn-danger "
            style={styles.bookApptButton}
            onClick={logOutUser}
            variant="contained"
          >
            Log Out
          </Button>
        </div>
      )}

      <div className="main-content">
        {showWelcomeScreen && (
          <WelcomeScreen user={user} handleGetStarted={handleGetStarted} />
        )}
        {console.log("Rendering RenderTable...")}

        {showTable && renderTableCall()}
      </div>
    </div>
  );
};

export default ManagerPage;
