import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { BASE_URL } from "../utilities/constants";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "../css/employees.css";


  const TechnicianPage = () => {
    const navigate = useNavigate();
  
    const [user, setUser] = useState(null);
    const [/*sessionId,*/ setSessionId] = useState(null);
    const [/*serviceAppointments,*/ setServiceAppointments] = useState([]);
    const [/*members,*/ setMembers] = useState([]);
    const [/*employees,*/ setEmployees] = useState([]);
    const [/*technicians,*/ setTechnicians] = useState([]);
   // const [selectedTab, setSelectedTab] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [assignedAppointments, setAssignedAppointments] = useState([]);
    const currentDate = new Date().toLocaleDateString(); 

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
  
          getTechnicianAppointments();
        } catch (error) {
          console.log("Not Authenticated or Unauthorized");
          navigate("/login");
        }
      };
  
      fetchData();
    }, );
  

    
  const logOutUser = async () => {
    await httpClient.post(`${BASE_URL}/api/logout`);
    window.location.href = "/";
  };

  /*
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

    */
  
    const handleGetStarted = () => {
      setShowTable(true);
    };
  
    const getTechnicianAppointments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/technician-view-service-appointments`, {
          method: 'GET',
          credentials: 'include' // Include cookies in the request
        });
        const data = await response.json();
        setAssignedAppointments(data); // Set the fetched appointments
      } catch (error) {
        console.error('Error fetching technician appointments:', error);
      }
    };
  
    const TechnicianAssignedAppointments = ({ appointments }) => {
      return (
        <div className="table-responsive">
          <h2 style={{ ...styles.welcomeScreenHeading, ...styles.largeTextStyle }}>Technician Assigned Appointments</h2>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark" style={{ ...styles.welcomeScreenHeading, ...styles.largeTextStyle }}>
              <tr>
                <th>Appointment ID</th>
                <th>VIN/Car ID</th>
                <th>Appointment Date</th>
                <th>Service Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ ...styles.welcomeScreenHeading, ...styles.largeTextStyle }}>
              {appointments.map(appointment => (
                <tr key={appointment.appointment_id}>
                  <td>{appointment.appointment_id}</td>
                  <td>{appointment.VIN_carID}</td>
                  <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                  <td>{appointment.service_name}</td>
                  <td>{appointment.status}</td>
                  <td><button value={appointment.appointment_id} onClick={() => handleOpen(appointment.appointment_id,appointment.VIN_carID,appointment.appointment_date,appointment.service_name,appointment.status,appointment.comments)}>Edit Appointment</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };


    const [apptID, setApptID] = React.useState(null);
    const [apptVIN, setApptVIN] = React.useState(null);
    const [apptDate, setApptDate] = React.useState(null);
    const [apptName, setApptName] = React.useState(null);
    const [apptStatus, setApptStatus] = React.useState(null);
    const [apptComment, setApptComment] = React.useState(null);

    //const [newStatus, setNewStatus] = React.useState(null);


    const [open, setOpen] = React.useState(false);
    const handleOpen = (apptID,apptVIN,apptDate,apptName,apptStatus,apptComment) => {
      setApptID(apptID);
      setApptVIN(apptVIN);
      setApptDate(apptDate);
      setApptName(apptName);
      setApptStatus(apptStatus);
      setApptComment(apptComment);
      setOpen(true);
    };
    
    const handleClose = () => setOpen(false);


    const ValueModal = ({ open, aptID, aptVIN, aptDate, aptName, aptStatus, aptComment, onClose }) => {
    
      const [value/*, setValue*/] = useState('');

      return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box sx={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Info for appointment {aptID}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Car Vin: {aptVIN}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Appointment Date: {new Date(aptDate).toLocaleString()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Appointment Name: {aptName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Appointment Status: {aptStatus}
          </Typography>
          {aptStatus !== "Done" ? (
            <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Update Appointment:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Update Status:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <select id="newStatus">
                  <option value={"Scheduled"}>Scheduled</option>
                  <option value={"Done"}>Done</option>
                  <option value={"Cancelled"}>Cancelled</option>
                </select>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Comment:
              </Typography>
              <textarea id="comment" name="comment" rows="4" cols="40" placeholder={aptComment}>
              </textarea>
        
    
    
    
    
              <Button onClick={() => handleUpdateSubmit(value)}>Update Appointment</Button>
              </div>
          ):(
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Comment: {aptComment}
            </Typography>
            
          )}
          
          <Button onClick={onClose}>Close</Button>
        </Box>
        </Modal>
      );
    };
    /*
    const handleStatusChange = (e) =>{
      setNewStatus(e.target.value)
    }
*/
    const handleUpdateSubmit = async () =>{
      var x = document.getElementById("newStatus");
      var stat = x.value;

      var y = document.getElementById("comment");
      var comSub = y.value;
      //value = new appt status


      console.log({apptID});

      const data = {
        appointment_id:apptID,
        comment:comSub,
        status: stat,
      }
      const requestData = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(data)
      }
      const response = await fetch(`${BASE_URL}/api/technician-view-service-appointments/technician-edit`, requestData);
    const responseData = await response.json();
    console.log(responseData);
    }


    const renderTable = () => {
      return (
        <div style={styles.tableWrapper}>
          <TechnicianAssignedAppointments appointments={assignedAppointments} />
        </div>
      );
    };
  
    return (
      <div style={{ minHeight: "80vh" }}> {/* Adjusted minHeight */}
        <div style={{ marginLeft: "", width: "100%", paddingTop: "20vh" }}> {/* Adjusted marginLeft, width, and paddingTop */}
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12">
              <h1>{user && user.first_name}, today is {currentDate}. Below are your assigned appointments:          <Button
            className="btn btn-block btn-danger "
            style={styles.bookApptButton}
            onClick={logOutUser}
            variant="contained"
          >
            Log Out
          </Button></h1> 
                {showTable ? (
                  renderTable()
                ) : (
                  <div style={styles.welcomeScreen}>
                    <h1 style={{ ...styles.welcomeScreenHeading, ...styles.largeTextStyle }}>Hi {user && user.first_name}.</h1> {/* Applied largeTextStyle */}
                    <img src="logo512.png" alt="Logo" style={{ width: "200px", margin: "0 auto" }} />
                    <br/>
                    <p style={{ ...styles.welcomeScreenText, ...styles.largeTextStyle }}>Click the button below to get started as {user && user.employeeType}.</p> {/* Applied largeTextStyle */}
                    <button onClick={handleGetStarted} style={{ ...styles.welcomeScreenButton, ...styles.largeTextStyle }} className="btn btn-primary">Get Started</button> {/* Applied largeTextStyle */}
                  </div>
                )}
              </div>

              <ValueModal open={open} aptID={apptID} aptVIN={apptVIN} aptDate={apptDate} aptName={apptName} aptStatus={apptStatus} aptComment={apptComment} onClose={handleClose} />

            </div>

            



          </div>
        </div>
      </div>
    );
    
  };
  
  export default TechnicianPage;