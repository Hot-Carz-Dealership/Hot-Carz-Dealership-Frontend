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
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BASE_URL, FORWARD_URL } from "../utilities/constants";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { states } from "../utilities/StateCodes";
import Footer from "../components/common/Footer";

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
  const [userData, setUserData] = useState(null);

  const [customerName, setCustomerName] = useState({
    firstName: "",
    lastName: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setCustomerName((prevNames) => ({
      ...prevNames,
      [name]: value,
    }));
  };
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
          setFirstName(userData.first_name);
          setLastName(userData.last_name);
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

  const handleAccept = async () => {
    // Check if the entered names match the ones entered before
    // Retrieve entered first name and last name from form data
    setModalSubmitted(true);

    console.log("Entered First Name:", customerName.firstName);
    console.log("Entered Last Name:", customerName.lastName);
    console.log("Stored First Name:", firstName);
    console.log("Stored Last Name:", lastname);

    // Check if the entered names match the ones entered before
    if (
      firstName.trim() === customerName.firstName.trim() &&
      lastname.trim() === customerName.lastName.trim()
    ) {
      // Names match or are empty, proceed with accepting financing terms
      console.log("Financing terms accepted by:", firstName, lastname);
      setFinancingModalOpen(false);

      try {
        // Make a POST request to insert financing information
        const response = await fetch(
          `${FORWARD_URL}/api/vehicle-purchase/insert-financing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              VIN_carID: queryParams.get("VIN_carID"),
              income: financingTerms.income,
              credit_score: financingTerms.credit_score,
              loan_total: financingTerms.loan_total,
              down_payment: financingTerms.down_payment,
              percentage: financingTerms.percentage,
              monthly_payment_sum: financingTerms.monthly_payment_sum,
              remaining_months: financingTerms.remaining_months,
            }),
          }
        );

        // Check if the request was successful
        if (response.ok) {
          const responseData = await response.json();
          console.log(
            "Financing information inserted successfully:",
            responseData.message
          );

          // Add item to cart
          await fetch(`${BASE_URL}/api/member/add_to_cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              item_name: queryParams.get("vehicleName"),
              item_price:
                parseFloat(financingTerms.down_payment) +
                parseFloat(financingTerms.loan_total),
              VIN_carID: queryParams.get("VIN_carID"),
              financed_amount: financingTerms.loan_total,
            }),
          });

          // Redirect to addons page
          setFinancingModalOpen(false);
          navigate(`/addons`);
        } else {
          // Handle error response
          const errorData = await response.json();
          console.error(
            "Error inserting financing information:",
            errorData.message
          );
          // Handle errors, display an error message or handle as needed
        }
      } catch (error) {
        console.error("Network error:", error);
        // Handle network errors, display an error message or handle as needed
      }
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
    setModalSubmitted(false);
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
  const [modalSubmited, setModalSubmitted] = React.useState(false);

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
      setFirstName(formData.get("first_name"));
      setLastName(formData.get("last_name"));

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
          SSN: formData.get("ssn"),
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
          console.log("Member account updated successfully:", responseData);

          // If member account updated successfully, call financing endpoint
          try {
            const financingResponse = await fetch(
              `${FORWARD_URL}/api/vehicle-purchase/apply-for-financing`,
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
    <>
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
                        defaultValue={userData.city}
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
                        helperText={
                          formSubmitted && !fields.ssn && "Enter valid SSN"
                        }
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
            <Typography variant="h5" id="financing-modal-title" gutterBottom>
              Financing Terms
            </Typography>
            {financingTerms && (
              <div>
                <Typography variant="body1">
                  Credit Score: {financingTerms.credit_score}
                </Typography>
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
                  VIN: {financingTerms.Vin_carID}
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
                <Typography variant="body1" gutterBottom>
                  Monthly Payment: $
                  {financingTerms.monthly_payment_sum.toFixed(2)}
                </Typography>
              </div>
            )}
            <div>
              <Typography variant="caption">
                By Typing you name below this will act as a signature for which
                you agree to the listed terms
              </Typography>
            </div>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="firstName"
                  onChange={handleNameChange}
                  value={customerName.firstName}
                  error={modalSubmited && !customerName.firstName}
                  helperText={
                    modalSubmited && customerName.firstName && "Required"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="lastName"
                  onChange={handleNameChange}
                  value={customerName.lastName}
                  error={modalSubmited && !customerName.lastName}
                  helperText={
                    modalSubmited && customerName.lastName && "Required"
                  }
                />
              </Grid>
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
      <Footer />
    </>
  );
}
