import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  buttonsContainer: {
    marginRight: "20px",
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
};
const ManagerPage = () => {
  const [bids, setBids] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicleListings, setVehicleListings] = useState([]);
  const [salesReport, setSalesReport] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not Authenticated");
      }
    })();
  }, []);

  const fetchData = async (type) => {
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

  const [selectedTab, setSelectedTab] = useState(null);

  const renderTable = () => {
    switch (selectedTab) {
      case 2:
        return (
          <div style={styles.tableContainer}>
            <h2>Bids</h2>
            <table style={styles.table}>
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
      case 3:
        return (
          <div style={styles.tableContainer}>
            <h2>Test Drives</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Customer Phone</th>
                  <th>Full Name</th>
                  <th>Vehicle</th>
                  <th>Datetime</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {testDrives.map((testDrive, index) => (
                  <tr key={index}>
                    <td>{testDrive.phone}</td>
                    <td>{testDrive.fullname}</td>
                    <td>{testDrive.car_make_model}</td>
                    <td>{testDrive.appointment_date}</td>
                    <td>{/* Action buttons */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 4:
        return (
          <div style={styles.tableContainer}>
            <h2>Customers</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone #</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>memberID</th>
                  <th>Action</th>
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
                    <td>{/* Action buttons */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 5:
        return (
          <div style={styles.tableContainer}>
            <h2>Vehicle Listings</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>VIN</th>
                  <th>Page Views</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
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
                    <td>{vehicle.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 6:
        return (
          <div style={styles.tableContainer}>
            <h2>Sales Report</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>New Balance</th>
                  <th>Date Time</th>
                </tr>
              </thead>
              <tbody>
                {salesReport.map((report, index) => (
                  <tr key={index}>
                    <td>{report.type}</td>
                    <td>{report.amount}</td>
                    <td>{report.purpose}</td>
                    <td>{report.newBalance}</td>
                    <td>{report.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonsContainer}>
        <button
          style={styles.modalButton}
          onClick={() => {
            setSelectedTab(2);
            fetchData("");
          }}
        >
          Bids
        </button>
        <button
          style={styles.modalButton}
          onClick={() => {
            setSelectedTab(3);
            fetchData("testdrives");
          }}
        >
          Test Drives
        </button>
        <button
          style={styles.modalButton}
          onClick={() => {
            setSelectedTab(4);
            fetchData("members");
          }}
        >
          Customers
        </button>
        <button
          style={styles.modalButton}
          onClick={() => {
            setSelectedTab(5);
            fetchData("vehicles/search");
          }}
        >
          Vehicle Listings
        </button>
        <button
          style={styles.modalButton}
          onClick={() => {
            setSelectedTab(6);
            fetchData("");
          }}
        >
          Sales Report
        </button>
        <Link to="/create-employee-account" style={styles.creationButton}>
          Create Employee Acct.
        </Link>
        <br></br>
        <Link to="/add-new-vehicle" style={styles.creationButton}>
          Add new Vehicle
        </Link>
      </div>
      {renderTable()}
    </div>
  );
};

export default ManagerPage;
