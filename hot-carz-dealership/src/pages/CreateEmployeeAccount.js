import React, { useState, useEffect } from "react"; // Import useEffect

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/creation.css";

const CreateEmployeeAccount = () => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
    password: "",
    confirmPassword: "",
    driverID: "",
    SSN: "",
    employeeType: "manager", // Default value
  });

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        const user = resp.data;

            // Check if user role is either "Manager" or "superAdmin"
            if (user.employeeType !== "Manager" && user.employeeType !== "superAdmin") {
                throw new Error("Unauthorized access");
            }

            setUser(user);
            // Store the session ID
            setSessionId(user.employeeID); // Assuming user.employeeID contains the session ID

            // Fetch service appointments and members data
        } catch (error) {
            console.log("Not Authenticated or Unauthorized");
            window.alert("You are not authorized to access this page.");
            navigate("/login");
        }
    })();
}, );


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.address === "" ||
      formData.city === "" ||
      formData.zipcode === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.driverID === "" ||
      formData.SSN === ""
    ) {
      window.alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/employees/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create employee account"
        );
      }

      const data = await response.json();
      console.log("Employee account created successfully:", data);

      window.alert("Employee account created successfully!");
    } catch (error) {
      console.error("Error creating employee account:", error);
      window.alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Link to="/managerPage" style={styles.sidebarButton}>
          Return to Manager Page
        </Link>
      </div>
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Create Employee Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstname" style={styles.label}>
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastname" style={styles.label}>
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="address" style={styles.label}>
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="city" style={styles.label}>
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="state" style={styles.label}>
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value="NJ"
              style={styles.input}
              disabled
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="zipcode" style={styles.label}>
              Zipcode:
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="driverID" style={styles.label}>
              Driver ID:
            </label>
            <input
              type="text"
              id="driverID"
              name="driverID"
              value={formData.driverID}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="SSN" style={styles.label}>
              SSN:
            </label>
            <input
              type="text"
              id="SSN"
              name="SSN"
              value={formData.SSN}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="employeeType" style={styles.label}>
              Employee Type:
            </label>
            <select
              id="employeeType"
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Manager">Manager</option>
              <option value="Technician">Technician</option>
            </select>
          </div>
          <button type="submit" style={styles.submitButton}>
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeAccount;
