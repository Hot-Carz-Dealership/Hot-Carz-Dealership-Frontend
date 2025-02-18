import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, FORWARD_URL } from "../utilities/constants";
import httpClient from "../httpClient";
import dayjs from "dayjs";
import dateFormat from "dateformat";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Account.css"; // Import the CSS file for styling
import styles from "../css/employees.css"; // Additional CSS file

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,

    // boxShadow: 24,
    // p: 4,
  },
};

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedTab, setSelectedTab] = useState(1);
  const [vehicleListings, setVehicleListings] = useState([]);
  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [signature, setSignature] = useState("");
  const [isSignatureEntered, setIsSignatureEntered] = useState(false);

  const [invoices, setInvoices] = useState([]);
  const [bids, setBids] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [testDrivesID, setTestDrivesID] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [bidOpen, setBidOpen] = React.useState(false);
  const [selectedBid, setSelectedBid] = useState([]);
  const handleClose = () => setOpen(false);
  const handleBidClose = () => setBidOpen(false);
  const tomorrow = dayjs().add(1, "day").set("hour", 9).startOf("hour");

  useEffect(() => {
    (async () => {
      try {
        // Fetch user data
        const userResp = await httpClient.get(`${BASE_URL}/@me`);
        setUser(userResp.data);

        setLoading(false);
        if (userResp.data.hasOwnProperty("memberID")) {
          const requestData = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          };

          // Fetch Vehicle Listings
          const vehicleListingsResponse = await fetch(
            `${BASE_URL}/api/member/vehicles`,
            requestData
          );
          const vehicleListingsData = await vehicleListingsResponse.json();
          console.log(
            "Member Vehicle Listings fetched successfully:",
            vehicleListingsData
          );
          setVehicleListings(vehicleListingsData);

          // Fetch Service Appointments
          const serviceResponse = await fetch(
            `${BASE_URL}/api/members/service-appointments`,
            requestData
          );
          const serviceData = await serviceResponse.json();
          setServiceAppointments(serviceData);

          // Fetch Current Bids
          const bidResponse = await fetch(
            `${BASE_URL}/api/member/current-bids`,
            requestData
          );
          const bidData = await bidResponse.json();
          setBids(bidData);

          // Fetch User's Order History
          const orderHistoryResponse = await fetch(
            `${FORWARD_URL}/api/member/order_history`,
            requestData
          );
          const orderHistoryData = await orderHistoryResponse.json();
          setInvoices(orderHistoryData);

          // Fetch Test Drive Data
          const driveResponse = await fetch(
            `${BASE_URL}/api/member/test_drive_data`,
            requestData
          );
          const driveData = await driveResponse.json();
          setTestDrives(driveData);
        }
      } catch (error) {
        console.log("Not Authenticated");
        setLoading(false);
        // Redirect to login page if user is not authenticated
        navigate("/login");
      }
    })();
  }, [navigate]); // Add navigate to the dependency array

  const logOutUser = async () => {
    await httpClient.post(`${BASE_URL}/api/logout`);
    window.location.href = "/";
  };

  const ValueModal = ({ open, onClose }) => {
    const [newValue, setNewValue] = useState(null);

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={style.modal}>
          <div className="rounded-lg bg-white p-8 shadow-2xl">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Select Date and Time for Test Drive:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="date"
                id="date"
                onChange={(newValue) => setNewValue(newValue)}
                defaultValue={tomorrow}
                minDate={tomorrow}
                views={["year", "month", "day", "hours", "minutes"]}
              />
            </LocalizationProvider>

            <div>
              <button
                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                onClick={() => handleTestdriveSubmit(newValue)}
              >
                Submit Test Drive
              </button>
            </div>
            <div>
              <button
                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-red-600"
                onClick={() => handleCancel(newValue)}
              >
                Cancel Test Drive
              </button>
            </div>

            <button
              className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    );
  };

  const BidModal = ({ open, onClose }) => {
    const [counterOfferAmount, setCounterOfferAmount] = useState("");

    const handleSignatureChange = (e) => {
      const signatureValue = e.target.value;
      setSignature(signatureValue);
      setIsSignatureEntered(
        !!signatureValue && signatureValue.trim().split(" ").length >= 2
      ); // Check if first and last name are provided
    };

    const userNoFinancing = async () => {
      console.log("User got money");
      console.log(selectedBid.VIN_carID);
      try {
        const nameResponse = await fetch(
          `${BASE_URL}/api/vehicles?vin=${selectedBid.VIN_carID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await nameResponse.json();
        const vehicleName = `${data.year} ${data.make} ${data.model}`;

        const response = await fetch(`${BASE_URL}/api/member/add_to_cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
          body: JSON.stringify({
            item_name: vehicleName,
            item_price: selectedBid.bidValue,
            VIN_carID: selectedBid.VIN_carID,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }
        handleBidConfirmation(selectedBid.bidID, "Confirmed");
        // Item added to cart successfully, navigate to addons page
        navigate("/addons");
      } catch (error) {
        console.error("Error adding item to cart:", error.message);
        // Handle error here, show error message to the user, etc.
      }
    };

    const userWantsFinancing = async () => {
      console.log("User wants financing");
      console.log(selectedBid.VIN_carID);
      const nameResponse = await fetch(
        `${BASE_URL}/api/vehicles?vin=${selectedBid.VIN_carID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await nameResponse.json();
      const vehicleName = `${data.year} ${data.make} ${data.model}`;

      handleBidConfirmation(selectedBid.bidID, "Confirmed");
      navigate(
        `/apply-financing?VIN_carID=${selectedBid.VIN_carID}&price=${
          selectedBid.bidValue
        }&vehicleName=${encodeURIComponent(vehicleName)}`
      );
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
              confirmationStatus: confirmationStatus,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update bid status");
        }
      } catch (error) {
        console.error("Error updating bid status:", error.message);
      }
      console.log("Updated Status of Bid. " + confirmationStatus);
    };

    const handleCounterBidOffer = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/member/current-bids`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            bid_id: selectedBid.bidID,
            new_bid_value: counterOfferAmount,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update bid offer price");
        }
      } catch (error) {
        console.error("Error updating bid offer price:", error.message);
      }
      handleBidClose();
      window.location.reload();
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

    return (
      <Modal
        open={bidOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={style.modal}>
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Bid Details</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={handleBidClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Display bid details here */}
                  <p>VIN: {selectedBid.VIN_carID}</p>
                  <p style={{ color: getBidColor(selectedBid) }}>
                    {" "}
                    Bid Amount: {selectedBid.bidValue}{" "}
                  </p>
                  <p>Status: {selectedBid.bidStatus}</p>
                  {/* Display finance information */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="counterOfferAmount"
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
                    <label htmlFor="signature">Signature:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="signature"
                      placeholder="Enter Signature"
                      value={signature}
                      onChange={handleSignatureChange}
                    />
                    <small className="form-text text-muted">
                      By signing this, you are accepting the proposed bid and
                      are entering into a contract with this entity.
                    </small>
                    {signature && !isSignatureEntered && (
                      <p style={{ color: "red" }}>
                        Please enter your first and last name.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      userWantsFinancing(selectedBid.bidID, "Confirmed")
                    }
                    disabled={!isSignatureEntered} // Disable button if signature is not provided
                  >
                    Accept and Finance
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      userNoFinancing(selectedBid.bidID, "Confirmed")
                    }
                    disabled={!isSignatureEntered} // Disable button if signature is not provided
                  >
                    Accept and Pay In Full
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
                    onClick={handleBidClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  const handleOpen = (vehicleVIN, testdrive_id) => {
    setOpen(true);
    setTestDrivesID(testdrive_id);
    console.log({ vehicleVIN });
    if (user) {
      console.log(user.memberID);
    } else {
      console.log("User not available");
    }
  };

  const handleBidOpen = async (bid) => {
    setBidOpen(true);
    setSelectedBid(bid);
  };

  const handleCancel = async (value) => {
    // var x = document.getElementById("date");
    var tdDate = dateFormat(value, "yyyy-mm-dd HH:MM:ss");

    console.log(tdDate);
    console.log(testDrives.VIN_carID);

    const data = {
      testdrive_id: testDrivesID,
      appointment_date: tdDate,
    };
    const requestData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${BASE_URL}/api/testdrives/edit`,
      requestData
    );
    const responseData = await response.json();
    console.log(responseData);
    window.location.href = "/account";
  };

  const handleTestdriveSubmit = async (value) => {
    //var x = document.getElementById("date");
    var tdDate = dateFormat(value, "yyyy-mm-dd HH:MM:ss");

    console.log(tdDate);
    console.log(testDrives.VIN_carID);

    const data = {
      testdrive_id: testDrivesID,
      appointment_date: tdDate,
    };
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${BASE_URL}/api/testdrives/edit`,
      requestData
    );
    const responseData = await response.json();
    console.log(responseData);
    window.location.href = "/account";
  };

  if (loading) {
    return <div>...</div>;
  }

  // No need to check if user is null here

  //Maybe we add this to a button or something
  // Check employeeType and redirect accordingly
  if (user.employeeType) {
    switch (user.employeeType) {
      case "superAdmin":
        navigate("/managerPage");
        break;
      case "Manager":
        navigate("/managerPage");
        break;
      case "Technician":
        navigate("/technicianpage");
        break;
      default:
        break;
    }
    // return null; // Do not render anything if redirection is performed
  }

  const handleEditInfo = () => {
    // Handle edit info logic here
  };

  // const fetchDataSelection = async (type) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/${type}`);
  //     console.log("Response received:", response);
  //     const data = await response.json();
  //     console.log("Data fetched successfully:", data);

  //     // Update the state variables based on the type of data
  //     switch (type) {
  //       case "bids":
  //         setBids(data);
  //         break;
  //       case "testdrives":
  //         setTestDrives(data);
  //         break;
  //       case "members":
  //         setCustomers(data);
  //         break;
  //       case "vehicles/search":
  //         setVehicleListings(data);
  //         break;
  //       default:
  //         console.error("Unknown data type:", type);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const [selectedTab, setSelectedTab] = useState(1);

  const renderSection = () => {
    switch (selectedTab) {
      case 1:
        return (
          <div style={styles.tableWrapper}>
            <AccountInfo />
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
            <ServiceAppointmentsTable />
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
            <ActiveBidsTable />
          </div>
        );

      default:
        return <AccountInfo />;
    }
  };

  const AccountInfo = () => (
    <div className="account ml-48 flex-1 space-xl-4 justify-center items-center h-full">
      <section className="flex flex-col items-center px-5 mt-24 max-w-full w-[854px] max-md:mt-10">
        <h1 className="text-6xl font-bold tracking-wide leading-5 text-center text-red-500 uppercase max-md:text-4xl">
          Account Info
        </h1>
        {user && (
          <ul className="mt-24">
            <li className="mt-4 text-xl tracking-wide leading-6 text-center text-black uppercase max-md:mt-2.5">
              <strong>First Name:</strong> {user.first_name}
            </li>
            <li className="mt-4 text-xl tracking-wide leading-6 text-center text-black uppercase max-md:mt-2.5">
              <strong>Last Name:</strong> {user.last_name}
            </li>
            <li className="mt-4 text-xl tracking-wide leading-6 text-center text-black uppercase max-md:mt-2.5">
              <strong>Phone Number:</strong> {user.phone}
            </li>
            <li className="mt-4 text-xl tracking-wide leading-6 text-center text-black uppercase max-md:mt-2.5">
              <strong>Email Address:</strong> {user.email}
            </li>
            <li className="mt-4 text-xl tracking-wide leading-6 text-center text-black uppercase max-md:mt-2.5">
              <strong>Driver's License Number:</strong> {user.driverID}
            </li>
          </ul>
        )}
        <div className="flex gap-5 justify-center mt-11 max-w-full text-xl tracking-wide leading-6 text-center text-black uppercase w-[579px] max-md:flex-wrap max-md:mt-10">
          <Button
            className="bookApptButton"
            style={styles.bookApptButton}
            onClick={handleEditInfo}
            variant="contained"
            component={Link}
            to="/editAccount"
          >
            Edit Info
          </Button>
          <Button
            className="bookApptButton "
            style={styles.bookApptButton}
            onClick={logOutUser}
            variant="contained"
          >
            Log Out
          </Button>
        </div>
      </section>
    </div>
  );

  const BidsTable = () => (
    <div className="table-responsive">
      <h2>Bids</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Bid ID</th>
            <th>VIN</th>
            <th>Bid Value</th>
            <th>Status</th>
            <th>Bid Date</th>
          </tr>
        </thead>
        {bids && bids.length > 0 ? (
          <tbody>
            {bids.map(
              (bid) =>
                bid.bidStatus === "Confirmed" && (
                  <tr key={bid.bidID}>
                    <td>{bid.bidID}</td>
                    <td>{bid.VIN_carID}</td>
                    <td>{bid.bidValue}</td>
                    <td>{bid.bidStatus}</td>
                    <td>{bid.bidTimestamp}</td>
                  </tr>
                )
            )}
          </tbody>
        ) : (
          <div></div>
        )}
      </table>
    </div>
  );

  const ActiveBidsTable = () => (
    <div className="table-responsive">
      <h2>Active Bids</h2>

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Bid ID</th>
            <th>VIN</th>
            <th>Bid Value</th>
            <th>Status</th>
            <th>Bid Date</th>
            <th>Action</th>
          </tr>
        </thead>
        {bids && bids.length > 0 ? (
          <tbody>
            {bids.map(
              (bid) =>
                bid.bidStatus === "Member Processing" && (
                  <tr key={bid.bidID}>
                    <td>{bid.bidID}</td>
                    <td>{bid.VIN_carID}</td>
                    <td>{bid.bidValue}</td>
                    <td>{bid.bidStatus}</td>
                    <td>{bid.bidTimestamp}</td>
                    <td>
                      <button onClick={() => handleBidOpen(bid)}>
                        Counter Offer
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        ) : (
          <div>No bids</div>
        )}
      </table>

      <BidModal open={bidOpen} onClose={handleBidClose} />
    </div>
  );

  const TestDrivesTable = () => (
    <div className="table-responsive">
      <h2>Test Drives</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Test Drive ID</th>
            <th>Car VIN</th>
            <th>Date</th>
            <th>Confirmed?</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Edit Test Drive</th>
          </tr>
        </thead>
        <tbody>
          {testDrives.map((drive) => (
            <tr key={drive.testdrive_id}>
              <td>{drive.testdrive_id}</td>
              <td>{drive.VIN_carID}</td>
              <td>{drive.appointment_date}</td>
              <td>{drive.confirmation}</td>
              <td>{drive.make}</td>
              <td>{drive.model}</td>
              <td>{drive.year}</td>
              <td>
                <button
                  onClick={() =>
                    handleOpen(drive.VIN_carID, drive.testdrive_id)
                  }
                >
                  Edit Test Drive
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ValueModal open={open} onClose={handleClose} />
    </div>
  );

  // Similarly, update the other table components in the same way

  const ServiceAppointmentsTable = () => (
    <div className="table-responsive">
      <h2>Service Appointments</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Appointment ID</th>
            <th>Car Vin</th>
            <th>Service</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceAppointments.map((appt) => (
            <tr key={appt.appointment_id}>
              <td>{appt.appointment_id}</td>
              <td>{appt.VIN_carID}</td>
              <td>{appt.service_name}</td>
              <td>{appt.appointment_date}</td>
              <td>{appt.comments}</td>
              <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const VehicleListingsTable = () => (
    <div className="table-responsive">
      <h2>Owned Vehicles</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Color</th>
            <th>Year</th>
            <th>VIN</th>
            <th>Mileage</th>
          </tr>
        </thead>
        <tbody>
          {vehicleListings.map((vehicle) => (
            <tr key={vehicle.VIN_carID}>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.VIN_carID}</td>
              <td>{vehicle.mileage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const SalesReportTable = () => {
    return (
      <div className="table-responsive">
        <h2>Order History</h2>

        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Confirmation Number</th>
              <th>Amount Paid</th>
              <th>Subtotal</th>
              <th>Taxes</th>
              <th>Total Financed</th>
              <th>Items</th>
            </tr>
          </thead>
          {invoices && invoices.length > 0 ? (
            <tbody>
              {invoices.map((order, index) => (
                <tr key={index}>
                  <td>{order["Confirmation Number"]}</td>
                  <td>${order["Amount Paid"]}</td>
                  <td>${order["Subtotal"]}</td>
                  <td>${order["Taxes"]}</td>
                  <td>${order["Total Financed"]}</td>
                  <td>
                    <ul>
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item["Item Name"]} - ${item["Item Price"]}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div>No invoices found.</div>
          )}
        </table>
      </div>
    );
  };

  return (
    <div>
      <div
        className="bg-dark text-white p-3 flex w-auto"
        style={{
          height: "100vh",
          overflowY: "auto",
          position: "fixed",
          left: 0,
          flexDirection: "column",
        }}
      >
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 1 ? "selected" : ""
          }`}
          onClick={() => {
            // fetchDataSelection("");
            setSelectedTab(1);
            renderSection();
          }}
        >
          Account Info
        </button>
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 2 ? "selected" : ""
          }`}
          onClick={() => {
            // fetchDataSelection("");
            setSelectedTab(2);
            renderSection();
          }}
        >
          Bids
        </button>
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 7 ? "selected" : ""
          }`}
          style={selectedTab === 7 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("");
            setSelectedTab(7);
            renderSection();
          }}
        >
          Active Bids
        </button>
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 3 ? "selected" : ""
          }`}
          style={selectedTab === 3 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("testdrives");
            setSelectedTab(3);
            renderSection();
          }}
        >
          Test Drives
        </button>
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 4 ? "selected" : ""
          }`}
          style={selectedTab === 4 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("vehicles/search");
            setSelectedTab(4);
            renderSection();
          }}
        >
          Service Appointments
        </button>
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 5 ? "selected" : ""
          }`}
          style={selectedTab === 5 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("vehicles/search");
            setSelectedTab(5);
            renderSection();
          }}
        >
          Owned Vehicles
        </button>
        <button
          className={`btn btn-block btn-dark ${
            selectedTab === 6 ? "selected" : ""
          }`}
          style={selectedTab === 6 ? styles.selected : {}}
          onClick={() => {
            setSelectedTab(6);
            renderSection();
          }}
        >
          Past Invoices
        </button>
        <Link
          to="/add-member-vehicle"
          className="btn btn-block btn-danger mt-2"
        >
          Add new Vehicle
        </Link>
        <Button
          className="btn btn-block btn-danger mt-3 "
          style={styles.bookApptButton}
          onClick={logOutUser}
          variant="contained"
        >
          Log Out
        </Button>
      </div>
      <div className="container" style={{ marginLeft: "250px" }}>
        <div className="row">
          <div>{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
