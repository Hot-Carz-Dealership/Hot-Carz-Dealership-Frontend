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


  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);




  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('${BASE_URL}/@emp');
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
      console.log("Employees fetched successfully" , employeeData)
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

  const [selectedTab, setSelectedTab] = useState(null);

 


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="bg-dark text-white p-3" style={{ height: "100vh", overflowY: "auto" }}>
            <button className="btn btn-block btn-dark mb-3" onClick={() => fetchData("")}>Bids</button>
            <button className="btn btn-block btn-dark mb-3" onClick={() => fetchData("testdrives")}>Test Drives</button>
            <button className="btn btn-block btn-dark mb-3" onClick={() => fetchData("members")}>Customers</button>
            <button className="btn btn-block btn-dark mb-3" onClick={() => fetchData("vehicles/search")}>Vehicle Listings</button>
            <button className="btn btn-block btn-dark mb-3" onClick={() => fetchData("")}>Sales Report</button>
            <Link to="/create-employee-account" className="btn btn-block btn-danger mb-3">Create Employee Acct.</Link>
            <Link to="/add-new-vehicle" className="btn btn-block btn-danger">Add new Vehicle</Link>
          </div>
        </div>
        <div className="col-md-9">
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
                  <th>Service Name</th>
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
                    <td>{appointment.service_name}</td>
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
                  <th>Assigned Apointment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
  {employees
    .filter(employee => employee.employeeType === 'Technician')
    .map(employee => (
      <tr key={employee.employeeID}>
        <td>{employee.firstname}</td>
        <td>{employee.lastname}</td>
        <td>{employee.email}</td>
        <td>{employee.employeeID}</td>
        <td>{/* Assigned Appointment */}</td>
        <td>{/* Action */}</td>
      </tr>
    ))}
</tbody>

            </table>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
