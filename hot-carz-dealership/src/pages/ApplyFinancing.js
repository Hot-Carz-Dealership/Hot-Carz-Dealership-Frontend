//ApplyFinancing.js

import React, { useState } from "react";
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
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BASE_URL } from "../utilities/constants";
import { useLocation } from "react-router-dom";

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
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [financingTerms, setFinancingTerms] = useState(null);

  const [customerName, setCustomerName] = useState({
    firstName: "",
    lastName: "",
  });

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setCustomerName((prevNames) => ({
      ...prevNames,
      [name]: value,
    }));
  };

  const handleAccept = () => {
    // Check if the entered names match the ones entered before
    if (
      customerName.firstName === fields.first_name &&
      customerName.lastName === fields.last_name
    ) {
      // Names match, proceed with accepting financing terms
      // You can perform further actions here
      console.log(
        "Financing terms accepted by:",
        customerName.firstName,
        customerName.lastName
      );
      setFinancingModalOpen(false);
    } else {
      // Names don't match, display an error message or handle as needed
      console.error("Entered names don't match the ones entered before");
      window.alert(
        "Entered names don't match the ones entered before. Please enter your name again."
      );
    }
  };

  const handleDeny = () => {
    // Handle denying financing terms...
    setFinancingModalOpen(false);
  };

  const [fields, setFields] = React.useState({
    first_name: false,
    last_name: false,
    address: false,
    city: false,
    zip_code: false,
    state_code: false,
    monthly_income: false,
    vin: true, // Set to true since VIN is provided in the URL
    ssn: false,
    down_payment: false,
    vehicle_price: true, // Set to true since Price is provided in the URL
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;

    // Validation rules for each field
    if (
      name === "first_name" ||
      name === "last_name" ||
      name === "city" ||
      name === "state_code"
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

    // Check if all fields are valid
    const allFieldsValid = Object.values(fields).every((field) => field);

    // If all fields are valid, submit the form
    if (allFieldsValid) {
      const formData = new FormData(event.currentTarget);
      const requestData = {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
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
          console.log("Member account updated successfully:", responseData);

          // If member account updated successfully, call financing endpoint
          try {
            const financingResponse = await fetch(
              `${BASE_URL}/api/vehicle-purchase/apply-for-financing`,
              {
                method: "POST",
                body: JSON.stringify({
                  Vin_carID: queryParams.get("VIN_carID"),
                  down_payment: formData.get("down_payment"),
                  monthly_income: formData.get("monthly_income"),
                  vehicle_cost: queryParams.get("price"),
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            const financingData = await financingResponse.json();

            // Check if the financing request was successful
            if (financingResponse.ok) {
              // Handle successful financing response
              console.log("Financing terms received:", financingData);
              // Display modal with financing terms
              // You can use a state variable to control the visibility of the modal
              // and another state variable to store the financing terms to be displayed in the modal
              setFinancingTerms(financingData.financing_terms);
              setFinancingModalOpen(true);
            } else {
              // Handle financing errors
              console.error(
                "Error applying for financing:",
                financingData.message
              );
              window.alert(financingData.message);
              // Display modal with financing error message
              // setFinancingModalOpen(true);
              // setFinancingErrorMessage(financingData.message);
            }
          } catch (error) {
            // Handle financing network errors
            console.error("Financing network error:", error);
            // Display modal with financing network error message
            // setFinancingModalOpen(true);
            // setFinancingErrorMessage("Network error. Please try again later.");
          }
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
            Apply for Financing
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  helperText={formSubmitted && !fields.first_name && "Required"}
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
                  helperText={formSubmitted && !fields.last_name && "Required"}
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
                  helperText={formSubmitted && !fields.address && "Required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  onChange={handleChange}
                  error={formSubmitted && !fields.city}
                  helperText={formSubmitted && !fields.city && "Required"}
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
                  SelectProps={{
                    native: true,
                  }}
                  error={formSubmitted && !fields.state_code}
                  helperText={formSubmitted && !fields.state_code && "Required"}
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="monthly_income"
                  label="Monthly Income"
                  name="monthly_income"
                  onChange={handleChange}
                  error={formSubmitted && !fields.monthly_income}
                  helperText={
                    formSubmitted &&
                    !fields.monthly_income &&
                    "Enter valid Monthly Income"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="vin"
                  label="Vehicle Identification Number (VIN)"
                  name="vin"
                  defaultValue={queryParams.get("VIN_carID")}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ssn"
                  label="Social Security Number (SSN)"
                  name="ssn"
                  onChange={handleChange}
                  error={formSubmitted && !fields.ssn}
                  helperText={formSubmitted && !fields.ssn && "Enter valid SSN"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="down_payment"
                  label="Down Payment"
                  name="down_payment"
                  onChange={handleChange}
                  error={formSubmitted && !fields.down_payment}
                  helperText={
                    formSubmitted &&
                    !fields.down_payment &&
                    "Enter valid Down Payment"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="vehicle_price"
                  label="Vehicle Price"
                  name="vehicle_price"
                  defaultValue={queryParams.get("price")}
                  disabled
                />
              </Grid>
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
      {/* Financing modal */}
      <Modal
        open={financingModalOpen}
        onClose={() => setFinancingModalOpen(false)}
        aria-labelledby="financing-modal-title"
        aria-describedby="financing-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="financing-modal-title" gutterBottom>
            Financing Terms
          </Typography>
          {financingTerms && (
            <div>
              <Typography variant="body1">
                Member Yearly Income: ${financingTerms.income.toFixed(2)}
              </Typography>

              <Typography variant="body1">
                Down Payment: ${financingTerms.down_payment.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Financed Amount: ${financingTerms.financed_amount.toFixed(2)}
              </Typography>

              <Typography variant="body1">
                Interest Total: ${financingTerms.interest_total.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Loan Total: ${financingTerms.loan_total.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Percentage: {financingTerms.percentage}%
              </Typography>
              <Typography variant="body1">
                Remaining Months: {financingTerms.remaining_months}
              </Typography>
              <Typography variant="body1">
                Monthly Payment: $
                {financingTerms.monthly_payment_sum.toFixed(2)}
              </Typography>
            </div>
          )}
          <TextField
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            onChange={handleNameChange}
            value={customerName.firstName}
            error={formSubmitted && !customerName.firstName}
            helperText={formSubmitted && !customerName.firstName && "Required"}
          />
          <TextField
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            onChange={handleNameChange}
            value={customerName.lastName}
            error={formSubmitted && !customerName.lastName}
            helperText={formSubmitted && !customerName.lastName && "Required"}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button fullWidth onClick={handleAccept} variant="contained">
                Accept
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={handleDeny} variant="contained">
                Deny
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

const states = [
  {
    value: "AL",
    label: "Alabama",
  },
  {
    value: "AK",
    label: "Alaska",
  },
  {
    value: "AZ",
    label: "Arizona",
  },
  // Add other states as needed
];
