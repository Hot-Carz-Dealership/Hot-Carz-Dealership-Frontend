import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL, FINANCE_URL } from "../utilities/constants";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";
import "../Account.css"; // Import the CSS file for styling
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dateFormat from "dateformat";

import styles from "../css/employees.css";


const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedTab, setSelectedTab] = useState(1);
  const [vehicleListings, setVehicleListings] = useState([]);
  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [bids, setBids] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [testDrivesID, setTestDrivesID] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const tomorrow = dayjs().add(1, "day").set("hour", 9).startOf("hour");

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        setUser(resp.data);

        setLoading(false);
        
        const requestData = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        }
  
        // Fetch Vehicle Listings
        const vehicleListingsResponse = await fetch(`${BASE_URL}/api/member/vehicles`, requestData);
        const vehicleListingsData = await vehicleListingsResponse.json();
        console.log("Member Vehicle Listings fetched successfully:", vehicleListingsData);
        setVehicleListings(vehicleListingsData);

        const serviceResponse = await fetch(`${BASE_URL}/api/members/service-appointments`, requestData);
        const serviceData = await serviceResponse.json();
        setServiceAppointments(serviceData);

        const invoiceResponse = await fetch(`${BASE_URL}/api/member/order_history`, requestData)
        const invoiceData = await invoiceResponse.json();
        console.log(invoiceData)
        setInvoices(invoiceData);

        const bidResponse = await fetch(`${BASE_URL}/api/member/current-bids`, requestData)
        const bidData = await bidResponse.json();
        setBids(bidData);

        const driveResponse = await fetch(`${BASE_URL}/api/member/test_drive_data`, requestData)
        const driveData = await driveResponse.json();
        setTestDrives(driveData);

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
    const [value, setValue] = useState("");
    const [newValue, setNewValue] = useState(null);

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={styles.modal}>
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
            <Button onClick={() => handleTestdriveSubmit(newValue)}>
              Submit Test Drive
            </Button>
          </div>
          <div>
            <Button onClick={() => handleCancel(newValue)}>
              Cancel Test Drive
            </Button>
          </div>

          <Button onClick={onClose}>Close</Button>
        </Box>
      </Modal>
    );
  };

  const handleOpen = (vehicleVIN, testdrive_id) => {
    setOpen(true);
    setTestDrivesID(testdrive_id)
    console.log({ vehicleVIN });
    if (user) {
      console.log(user.memberID);
    } else {
      console.log("User not available");
    }
  };

  const handleCancel = async (value) => {
    var x = document.getElementById("date");
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
    window.location.href = "/account";
  };

  const handleTestdriveSubmit = async (value) => {
    var x = document.getElementById("date");
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
        return <AccountInfo />;
      case 2:
        return <BidsTable />;
      case 3:
        return <TestDrivesTable />;
      case 4:
        return <ServiceAppointmentsTable />;
      case 5:
        return <VehicleListingsTable />;
      case 6:
        return <SalesReportTable />;
      case 7:
        return <ActiveBidsTable />;
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bid ID</th>
            <th>VIN</th>
            <th>Bid Value</th>
            <th>Status</th>
            <th>Bid Date</th>
          </tr>
        </thead>
        <tbody> 
        {bids.map(bid => ( bid.bidStatus === "Confirmed" &&
                <tr key={bid.bidID}>
                  <td>{bid.bidID}</td>
                  <td>{bid.VIN_carID}</td>
                  <td>{bid.bidValue}</td>
                  <td>{bid.bidStatus}</td>
                  <td>{bid.bidTimestamp}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );

  const ActiveBidsTable = () => (
    <div className="table-responsive">
      <h2>Active Bids</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bid ID</th>
            <th>VIN</th>
            <th>Bid Value</th>
            <th>Status</th>
            <th>Bid Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody> 
        {bids.map(bid => ( bid.bidStatus === "Processing" &&
                <tr key={bid.bidID}>
                  <td>{bid.bidID}</td>
                  <td>{bid.VIN_carID}</td>
                  <td>{bid.bidValue}</td>
                  <td>{bid.bidStatus}</td>
                  <td>{bid.bidTimestamp}</td>
                  <td><button>Counter Offer</button><button>Decline</button></td>
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
        {testDrives.map(drive => (
                <tr key={drive.testdrive_id}>
                  <td>{drive.testdrive_id}</td>
                  <td>{drive.VIN_carID}</td>
                  <td>{drive.appointment_date}</td>
                  <td>{drive.confirmation}</td>
                  <td>{drive.make}</td>
                  <td>{drive.model}</td>
                  <td>{drive.year}</td>
                  <td><button onClick={() => handleOpen(drive.VIN_carID, drive.testdrive_id)}>Edit Test Drive</button></td>
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
      <table className="table table-bordered">
        <thead>
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
        {serviceAppointments.map(appt => (
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
      <table className="table table-bordered">
        <thead>
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
        {vehicleListings.map(vehicle => (
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
      <div>
        {invoices.map((sale, index) => (
          <div key={index}>
            <h2>Confirmation Number: {sale["Confirmation Number"]}</h2>
            <p>Amount Paid: {sale["Amount Paid"]}</p>
            <p>Subtotal: {sale["Subtotal"]}</p>
            <p>Taxes: {sale["Taxes"]}</p>
            <p>Total Financed: {sale["Total Financed"]}</p>
            <h3>Items:</h3>
            <ul>
              {sale.items.map((item, idx) => (
                <li key={idx}>
                  <p>Item Name: {item["Item Name"]}</p>
                  <p>Item Price: {item["Item Price"]}</p>
                  <p>Financed Amount: {item["Financed Amount"]}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
          className="btn btn-block btn-dark mb-3"
          style={selectedTab === 1 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("");
            setSelectedTab(1);
            renderSection();
          }}
        >
          Account Info
        </button>
        <button
          className="btn btn-block btn-dark mb-3"
          style={selectedTab === 2 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("");
            setSelectedTab(2);
            renderSection();
          }}
        >
          Bids
        </button>
        <button
          className="btn btn-block btn-dark mb-3"
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
          className="btn btn-block btn-dark mb-3"
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
          className="btn btn-block btn-dark mb-3"
          style={selectedTab === 4 ? styles.selected : {}}
          onClick={() => {
            // fetchDataSelection("vehicles/search");
            setSelectedTab(4);
            renderSection();
          }}
        >Service Appointments</button>
        <button
          className="btn btn-block btn-dark mb-3"
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
          className="btn btn-block btn-dark mb-3"
          style={selectedTab === 6 ? styles.selected : {}}
          onClick={() => {
            setSelectedTab(6);
            renderSection();
          }}
        >
          Past Invoices
        </button>
        <Link to="/add-member-vehicle" className="btn btn-block btn-danger">
          Add new Vehicle
        </Link>
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
