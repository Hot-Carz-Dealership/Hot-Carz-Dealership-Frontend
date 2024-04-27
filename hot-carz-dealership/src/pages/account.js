import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL, FINANCE_URL } from "../utilities/constants";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";
import "../Account.css"; // Import the CSS file for styling

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedTab, setSelectedTab] = useState(1);
  const [vehicleListings, setVehicleListings] = useState([]);
  const [serviceAppointments, setServiceAppointments] = useState([]);

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
            <th>Make</th>
            <th>Model</th>
            <th>VIN</th>
            <th>MSRP</th>
            <th>Bid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody> TODO: idk replace this later</tbody>
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
        <tbody>TODO: idk replace this later</tbody>
      </table>
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
      <h2>Vehicle Listings</h2>
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
    const [salesReport, setSalesReport] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [totalSales, setTotalSales] = useState("");

    useEffect(() => {
      const response = fetch(`${FINANCE_URL}/`);
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
        alert("Please select both month and year.");
        return;
      }

      try {
        // Send a GET request to your backend API with selected month and year
        const response = await fetch(
          `${FINANCE_URL}/api/manager/monthly-sales-report?month=${selectedMonth}&year=${selectedYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sales report");
        }

        const data = await response.json();
        setSalesReport(data.sales_report);
        // Set total sales in the state
        setTotalSales(data.total_sales);
      } catch (error) {
        console.error("Error fetching sales report:", error.message);
      }
    };

    return (
      <div className="table-responsive">
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
          Vehicle Listings
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
