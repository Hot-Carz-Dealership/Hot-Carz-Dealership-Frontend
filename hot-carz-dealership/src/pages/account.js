import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";
import "../Account.css"; // Import the CSS file for styling
import { BASE_URL } from "../utilities/constants";

const styles = {
  bookApptButton: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    marginTop: "10px", // Add margin to separate from other content
    marginLeft: "10px",
    justifyContent: "center",
  },
};

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
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

  const handleEditInfo = () => {
    // Handle edit info logic here
  };
  return (
    <div className="account flex justify-center items-center h-full">
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
        <p>Modals for Test Drives and Tracker down below</p>
      </section>
    </div>
  );
};

export default Account;
