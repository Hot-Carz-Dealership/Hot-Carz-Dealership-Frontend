//ApplyFinancing.js

import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BASE_URL } from "../utilities/constants";
import { useNavigate } from "react-router-dom";
import { states } from "../utilities/StateCodes";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Hot Carz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function ApplyFinancing() {
  // const [financingModalOpen, setFinancingModalOpen] = useState(false);
  // const [financingTerms, setFinancingTerms] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/@me`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          // Set the initial values for firstName and lastName
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const [fields, setFields] = React.useState({
    first_name: false,
    last_name: false,
    address: false,
    city: false,
    zip_code: false,
    state_code: false,
    monthly_income: false,
    // vin: true, // Set to true since VIN is provided in the URL
    // ssn: false,
    // down_payment: false,
    // vehicle_price: true, // Set to true since Price is provided in the URL
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;

    // Validation rules for each field
    if (
      name === "first_name" ||
      name === "last_name" ||
      name === "city" ||
      name === "state_code" ||
      name === "driverID" // Add validation rule for driverID
    ) {
      isValid = /^[a-zA-Z]+$/.test(value.trim()); // Only allow letters
    } else if (name === "email") {
      isValid = /\S+@\S+\.\S+/.test(value.trim()); // Email validation
    } else if (name === "phone") {
      isValid = /^\d{10}$/.test(value.trim()); // Phone number validation
    } else if (name === "address") {
      isValid = value.trim() !== "";
    } else if (name === "zip_code") {
      isValid = /^\d{5}$/.test(value.trim()); // 5-digit zip code
    } else if (name === "monthly_income" || name === "down_payment") {
      isValid = /^\d+(\.\d{1,2})?$/.test(value.trim()); // Positive number with up to 2 decimal places
    } else if (name === "vin") {
      isValid = /^[A-HJ-NPR-Z0-9]{17}$/i.test(value.trim()); // VIN validation
    } else if (name === "ssn") {
      isValid = /^\d{3}-?\d{2}-?\d{4}$/.test(value.trim()); // SSN validation
    }

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value.trim() !== "" && isValid,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const formData = new FormData(event.currentTarget);
    const fieldsValidation = {};

    // Validation rules for each field
    const validationRules = {
      first_name: /^[a-zA-Z]+$/,
      last_name: /^[a-zA-Z]+$/,
      city: /^[a-zA-Z]+$/,
      state_code: /^[a-zA-Z]+$/,
      email: /\S+@\S+\.\S+/,
      phone: /^\d{10}$/,
      address: /.+/,
      zip_code: /^\d{5}$/,
      monthly_income: /^\d+(\.\d{1,2})?$/,
      down_payment: /^\d+(\.\d{1,2})?$/,
      vin: /^[A-HJ-NPR-Z0-9]{17}$/i,
      ssn: /^\d{3}-?\d{2}-?\d{4}$/,
    };

    // Validate each field
    for (const [name, value] of formData.entries()) {
      const isValid = validationRules[name]
        ? validationRules[name].test(value.trim())
        : true;
      fieldsValidation[name] = isValid && value.trim() !== "";
    }

    // Check if all fields are valid
    // Check if all fields are valid
    const allFieldsValid = Object.values(fieldsValidation).every(
      (field) => field
    );
    // Set fields validity state after form submission
    setFields(fieldsValidation);

    // If all fields are valid, submit the form
    if (allFieldsValid) {
      const formData = new FormData(event.currentTarget);

      const requestData = {
        method: "POST",
        body: JSON.stringify({
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state_code"),
          zipcode: formData.get("zip_code"),
          driverID: formData.get("driverID"),
          // SSN: formData.get("ssn"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      try {
        const response = await fetch(
          `${BASE_URL}/api/members/update`,
          requestData
        );
        const responseData = await response.json();

        // Check if the request was successful
        if (response.ok) {
          // Handle successful member update response
          navigate("/account");
          window.alert("Account Updated Succesfully");
          console.log("Member account updated successfully:", responseData);

          // If member account updated successfully, call financing endpoint
        } else {
          // Handle member update errors
          console.error("Error updating member account:", responseData.error);
          // Display alert or error message to the user
          // Example: window.alert("Error updating member account. Please try again.");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
        // Display alert or error message to the user
        // Example: window.alert("Network error. Please try again later.");
      }
    } else {
      // If any field is invalid, do not submit the form
      // You can display an error message or handle it as per your UI requirements
      console.log("Form has errors. Cannot submit.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Account Info{" "}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Autofill fields with user data */}
              {userData && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      error={formSubmitted && !fields.first_name}
                      helperText={
                        formSubmitted && !fields.first_name && "Required"
                      }
                      defaultValue={userData.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                      onChange={handleChange}
                      error={formSubmitted && !fields.last_name}
                      helperText={
                        formSubmitted && !fields.last_name && "Required"
                      }
                      defaultValue={userData.last_name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      error={formSubmitted && !fields.email}
                      helperText={
                        formSubmitted &&
                        !fields.email &&
                        "Enter a valid email address"
                      }
                      defaultValue={userData.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      error={formSubmitted && !fields.phone}
                      helperText={
                        formSubmitted &&
                        !fields.phone &&
                        "Enter a valid 10-digit phone number"
                      }
                      defaultValue={userData.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      error={formSubmitted && !fields.address}
                      helperText={
                        formSubmitted && !fields.address && "Required"
                      }
                      defaultValue={userData.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      onChange={handleChange}
                      error={formSubmitted && !fields.city}
                      helperText={formSubmitted && !fields.city && "Required"}
                      defaultValue={userData.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="zip_code"
                      label="Zip Code"
                      name="zip_code"
                      onChange={handleChange}
                      error={formSubmitted && !fields.zip_code}
                      helperText={
                        formSubmitted &&
                        !fields.zip_code &&
                        "Enter valid 5-digit Zip Code"
                      }
                      defaultValue={userData.zipcode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      select
                      id="state_code"
                      label="State Code"
                      name="state_code"
                      onChange={handleChange}
                      defaultValue={userData.state}
                      SelectProps={{
                        native: true,
                      }}
                      error={formSubmitted && !fields.state_code}
                      helperText={
                        formSubmitted && !fields.state_code && "Required"
                      }
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="driverID"
                      label="Driver ID"
                      name="driverID"
                      onChange={handleChange}
                      error={formSubmitted && !fields.driverID}
                      helperText={
                        formSubmitted && !fields.driverID && "Required"
                      }
                      defaultValue={userData?.driverID || ""}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "red" }}
            >
              Submit Application
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                {/* <Link href="/login" variant="body2" color="inherit">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
