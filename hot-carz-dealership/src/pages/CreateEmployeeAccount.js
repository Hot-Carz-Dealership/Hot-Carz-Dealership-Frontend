import React, { useState, useEffect } from "react"; // Import useEffect

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateEmployeeAccount = () => {
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
    employeeType: "Manager", // Default value
  });

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        const userData = resp.data;
        // Check if user role is either "Manager" or "superAdmin"
        console.log(userData.employeeType);
        if (
          userData.employeeType !== "Manager" &&
          userData.employeeType !== "superAdmin"
        ) {
          throw new Error("Unauthorized access");
        }

        // Store the session ID

        // Fetch service appointments and members data
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
        window.alert("You are not authorized to access this page.");
        navigate("/login");
      }
    })();
  }, [navigate]);


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
    if (
      !emailValid ||
      !phoneValid ||
      !zipcodeValid ||
      !passwordValid ||
      !confirmPasswordValid ||
      !SSNValid
    ) {
      window.alert("Please enter valid information in all fields.");
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

  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [zipcodeValid, setZipcodeValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [SSNValid, setSSNValid] = useState(true);


  return (
    <div className="container">
      <div className="sidebar">
        <Link to="/managerPage" className="sidebarButton">
          Return to Manager Page
        </Link>
      </div>
      <div className="mainContent">
        <h2 className="heading">Create Employee Account</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label htmlFor="firstname" className="label">
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="lastname" className="label">
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              const email = e.target.value;
              const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email);
              setEmailValid(isValidEmail);
              handleChange(e);
            }}
            className={emailValid ? "input" : "input invalid"}
            required
          />
          {!emailValid && (
            <span className="errorMessage">Please enter a valid email address</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="phone" className="label">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const phoneNumber = e.target.value;
              const isValidPhoneNumber = /^\d{10}$/g.test(phoneNumber);
              setPhoneValid(isValidPhoneNumber);
              handleChange(e);
            }}
            className={phoneValid ? "input" : "input invalid"}
            required
          />
          {!phoneValid && (
            <span className="errorMessage">Please enter a valid phone number</span>
          )}
        </div>
          <div className="formGroup">
            <label htmlFor="address" className="label">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="city" className="label">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="state" className="label">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value="NJ"
              className="input"
              disabled
            />
          </div>
          <div className="formGroup">
            <label htmlFor="zipcode" className="label">
              Zipcode:
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={(e) => {
                const zipcode = e.target.value;
                const isValidZipcode = /^\d{5}$/g.test(zipcode);
                setZipcodeValid(isValidZipcode);
                handleChange(e);
              }}
              className={zipcodeValid ? "input" : "input invalid"}
              required
            />
            {!zipcodeValid && (
              <span className="errorMessage">Please enter a valid 5-digit zipcode</span>
            )}
          </div>
          <div className="formGroup">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                const password = e.target.value;
                const isValidPassword = password.length >= 8 && !/\s/g.test(password);
                setPasswordValid(isValidPassword);
                handleChange(e);
              }}
              className={passwordValid ? "input" : "input invalid"}
              required
            />
            {!passwordValid && (
              <span className="errorMessage">Password must be at least 8 characters long and cannot contain spaces</span>
            )}
          </div>
          <div className="formGroup">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => {
                const confirmPassword = e.target.value;
                const isValidConfirmPassword = confirmPassword === formData.password;
                setConfirmPasswordValid(isValidConfirmPassword);
                handleChange(e);
              }}
              className={confirmPasswordValid ? "input" : "input invalid"}
              required
            />
            {!confirmPasswordValid && (
              <span className="errorMessage">Passwords do not match</span>
            )}
          </div>
          <div className="formGroup">
            <label htmlFor="driverID" className="label">
              Driver ID:
            </label>
            <input
              type="text"
              id="driverID"
              name="driverID"
              value={formData.driverID}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
         <div className="formGroup">
            <label htmlFor="SSN" className="label">
              SSN:
            </label>
            <input
              type="text"
              id="SSN"
              name="SSN"
              value={formData.SSN}
              onChange={(e) => {
                const SSN = e.target.value;
                const isValidSSN = /^\d{9}$/g.test(SSN);
                setSSNValid(isValidSSN);
                handleChange(e);
              }}
              className={SSNValid ? "input" : "input invalid"}
              required
            />
            {!SSNValid && (
              <span className="errorMessage">Please enter a valid 9-digit SSN</span>
            )}
          </div>
          <div className="formGroup">
            <label htmlFor="employeeType" className="label">
              Employee Type:
            </label>
            <select
              id="employeeType"
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="Manager">Manager</option>
              <option value="Technician">Technician</option>
            </select>
          </div>
          <button type="submit" className="submitButton">
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default CreateEmployeeAccount;
