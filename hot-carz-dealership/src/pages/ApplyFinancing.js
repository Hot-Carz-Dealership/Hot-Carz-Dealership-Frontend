// import React from "react";
// import { useLocation } from "react-router-dom";

// const ApplyFinancing = () => {
//   // Retrieve price and VIN from local storage
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const price = queryParams.get("price");
//   const VIN_carID = queryParams.get("VIN_carID");

//   return (
//     <div>
//       <h2>Apply for Financing</h2>
//       <p>Price: {price}</p>
//       <p>VIN: {VIN_carID}</p>
//       {/* Additional form elements for financing */}
//     </div>
//   );
// };

// export default ApplyFinancing;

import * as React from "react";
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
      };

      try {
        const response = await fetch(
          `${BASE_URL}/api/financing/apply`,
          requestData
        );
        const responseData = await response.json();

        // Check if the request was successful
        if (response.ok) {
          // Handle successful response, such as redirecting the user or displaying a success message
          console.log(
            "Financing application submitted successfully:",
            responseData
          );
          // Display alert
          window.alert("Financing application submitted successfully!");
        } else {
          // Handle errors, such as displaying an error message to the user
          console.error(
            "Error submitting financing application:",
            responseData.error
          );
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
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
