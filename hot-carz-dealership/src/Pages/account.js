import React from "react";
import Button from "@mui/material/Button";

const Account = () => {
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

  const handleLogOut = () => {
    // Handle log out logic here
  };

  return (
    <div className="account" style={styles.homepage}>
      <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
        Account Info{" "}
      </header>
      <ul>
        <li style={styles.listAlign}>Name: </li>
        <li style={styles.listAlign}>Address: </li>
        <li style={styles.listAlign}>Phone Number: </li>
        <li style={styles.listAlign}>Email Address: </li>
        <li style={styles.listAlign}>Drivers License Number: </li>
      </ul>
      <Button
        className="bookApptButton"
        onClick={handleEditInfo}
        style={styles.bookApptButton}
        variant="contained"
      >
        Edit Info
      </Button>
      <Button
        className="bookApptButton"
        onClick={handleLogOut}
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
