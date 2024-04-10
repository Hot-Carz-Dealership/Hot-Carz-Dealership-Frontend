import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import httpClient from "../httpClient";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
        setLoading(false);
      } catch (error) {
        console.log("Not Authenticated");
        setLoading(false);
        // Redirect to login page if user is not authenticated
        navigate("/login");
      }
    })();
  }, [navigate]); // Add navigate to the dependency array

  const logOutUser = async () => {
    await httpClient.post("//localhost:5000/api/logout");
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
        navigate("/superAdmin");
        break;
      case "Manager":
        navigate("/managerPage");
        break;
      case "Technician":
        // navigate("/managerPage");
        break;
      default:
        break;
    }
    // return null; // Do not render anything if redirection is performed
  }

  const styles = {
    homepage: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    welcome: {
      fontSize: "2em",
      color: "black",
      fontWeight: "bold",
    },
    carDisplay: {
      marginTop: "20px",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "5px",
    },
    carDisplayTitle: {
      fontSize: "1.5em",
      color: "red",
    },

    featuredCarList: {
      listStyle: "none",
      padding: 0,
      display: "flex",
      justifyContent: "space-between",
    },
    featuredCarItem: {
      textAlign: "center",
      flex: "1",
    },

    featuredCarImage: {
      height: "300px",
      width: "300px",
      margin: "0 auto",
    },

    searchButton: {
      backgroundColor: "red",
      color: "white",
      padding: "5px 10px",
    },

    servicesItem: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "30%",
      textAlign: "center",
      display: "inline-block",
      marginBottom: "20px",
    },
    serviceImage: {
      height: "200px",
      width: "300px",
      margin: "0 auto",
    },
    servicesDisplayTitle: {
      color: "red",
      textAlign: "center",
      fontSize: "3em",
    },
    price: {
      color: "red",
    },
    bookApptButton: {
      backgroundColor: "red",
      color: "white",
      padding: "5px 10px",
      marginTop: "10px", // Add margin to separate from other content
      marginLeft: "10px",
      justifyContent: "center",
    },
    listAlign: {
      justifyContent: "left",
    },
  };
  const handleEditInfo = () => {
    // Handle edit info logic here
  };

  return (
    <div className="account" style={styles.homepage}>
      <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6">
        Account Info
      </header>
      {user && (
        <ul>
          <li style={styles.listAlign}>First Name: {user.first_name}</li>
          <li style={styles.listAlign}>Last Name: {user.last_name}</li>

          {/* <li style={styles.listAlign}>Address: {user.address}</li> */}
          <li style={styles.listAlign}>Phone Number: {user.phone}</li>
          <li style={styles.listAlign}>Email Address: {user.email}</li>
          <li style={styles.listAlign}>
            Driver's License Number: {user.driverID}
          </li>
        </ul>
      )}
      <Button
        className="bookApptButton"
        onClick={handleEditInfo}
        style={styles.bookApptButton}
        variant="contained"
        component={Link}
        to="/editAccount"
      >
        Edit Info
      </Button>
      <Button
        className="bookApptButton"
        onClick={logOutUser}
        style={styles.bookApptButton}
        variant="contained"
      >
        Log Out
      </Button>
      <p>Modals for Test Drives and Tracker down below</p>
    </div>
  );
};

export default Account;
