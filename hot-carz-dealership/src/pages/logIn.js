import React from "react";
import Button from "@mui/material/Button";
import httpClient from "../httpClient";
import { useState } from "react";
import { BASE_URL } from "../utilities/constants";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    try {
      const resp = await httpClient.post(`${BASE_URL}/api/members/login`, {
        username: username,
        password: password,
      });

      if (resp.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

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

    servicesDisplayTitle: {
      color: "red",
      fontSize: "3em",
    },

    bookApptButton: {
      backgroundColor: "red",
      color: "white",
      padding: "5px 10px",
      marginTop: "10px", // Add margin to separate from other content
      marginRight: "10px", // Adjust spacing as needed
    },
  };

  // const handleSubmit = () => {
  //   // Handle submit logic here
  // };

  const handleCreateAccount = () => {
    // Handle create account logic here
  };

  return (
    <div className="LogIn" style={styles.homepage}>
      <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
        Sign In{" "}
      </header>
      <form>
        <label for="username">Username: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label for="password">Password: </label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          onClick={logInUser}
          style={styles.bookApptButton}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          style={styles.bookApptButton}
          onClick={handleCreateAccount}
        >
          Create New Account
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
