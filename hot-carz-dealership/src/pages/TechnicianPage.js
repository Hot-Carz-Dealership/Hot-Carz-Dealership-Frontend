import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { BASE_URL } from "../utilities/constants";
import { useNavigate } from "react-router-dom";


const styles = {
    tablespacing: {
      marginTop: '20px',
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
  };

const TechnicianPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showTable, setShowTable] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        const user = resp.data;

        if (user.employeeType !== "Technician") {
          throw new Error("Unauthorized access");
        }

        setUser(user);
        setSessionId(user.employeeID);

        const appointmentsResponse = await fetch(`${BASE_URL}/api/service-appointments`);
        const appointmentsData = await appointmentsResponse.json();
        setServiceAppointments(appointmentsData);

        const membersResponse = await fetch(`${BASE_URL}/api/members`);
        const membersData = await membersResponse.json();
        setMembers(membersData);

        const employeeResponse = await fetch(`${BASE_URL}/api/employees`);
        const employeeData = await employeeResponse.json();
        setEmployees(employeeData);

        const technicianResponse = await fetch(`${BASE_URL}/api/employees/technicians`);
        const techniciansData = await technicianResponse.json();
        setTechnicians(techniciansData);
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const handleSelectionChange = (appointmentId) => async (event) => {
    const selectedTechnicianId = event.target.value;

    try {
      await assignTechnician(appointmentId, selectedTechnicianId, sessionId);
    } catch (error) {
      console.error('Error assigning technician:', error.message);
    }
  };

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
  const handleGetStarted = () => {
    setShowTable(true);
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

  const assignTechnician = (appointmentId, technicianId, sessionId) => {
    const data = {
      appointment_id: appointmentId,
      employee_id: technicianId,
    };

    fetch(`${BASE_URL}/api/manager/assign-service-appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to assign technician to appointment');
      }
      console.log('Technician assigned successfully');
    })
    .catch(error => {
      console.error('Error assigning technician:', error.message);
    });
  };

  const renderTable = () => {
    return (
        <div style={styles.tableWrapper}>
          <ServiceCenter />
        </div>
      );
  };

  return (
    <div>
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
                  <br/>
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

export default TechnicianPage;
