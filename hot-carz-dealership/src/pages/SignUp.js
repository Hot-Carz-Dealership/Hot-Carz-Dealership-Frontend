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

export default function SignUp() {
  const [fields, setFields] = React.useState({
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    driverID: false,
    username: false,
    password: false,
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;

    // Validate first name and last name
    if (name === "first_name" || name === "last_name") {
      isValid = /^[a-zA-Z]+$/.test(value.trim()); // Only allow letters
    }

    // Validate username
    if (name === "username") {
      isValid = /^[a-zA-Z0-9_]{3,}$/.test(value.trim()); // At least 3 characters, alphanumeric and underscores
    }

    // Validate email
    if (name === "email") {
      isValid = /\S+@\S+\.\S+/.test(value);
    }

    // Validate phone number
    if (name === "phone") {
      isValid =
        // eslint-disable-next-line
        /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(
          value
        );
    }

    // Validate driver's license ID
    if (name === "driverID") {
      isValid = /^[a-zA-Z0-9]{1,15}$/.test(value); // Assuming driver's license ID is up to 15 characters long and alphanumeric
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
          `${BASE_URL}/api/members/create`,
          requestData
        );
        const responseData = await response.json();

        // Check if the request was successful
        if (response.ok) {
          // Handle successful response, such as redirecting the user or displaying a success message
          console.log("Member account created successfully:", responseData);
          // Display alert
          window.alert("Member account created successfully!");

          // Redirect to /account page
          window.location.href = "/account";
        } else {
          // Handle errors, such as displaying an error message to the user
          console.error("Error creating member account:", responseData.error);
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
            Sign up
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
                    formSubmitted && !fields.email && "Enter valid email"
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
                  autoComplete="tel"
                  onChange={handleChange}
                  error={formSubmitted && !fields.phone}
                  helperText={
                    formSubmitted && !fields.phone && "Enter Valid Phone"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="driverID"
                  label="Driver's License ID"
                  name="driverID"
                  onChange={handleChange}
                  error={formSubmitted && !fields.driverID}
                  helperText={
                    formSubmitted &&
                    !fields.driverID &&
                    "Enter Valid Drivers License ID"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  error={formSubmitted && !fields.username}
                  helperText={formSubmitted && !fields.username && "Required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={formSubmitted && !fields.password}
                  helperText={formSubmitted && !fields.password && "Required"}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "red" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2" color="inherit">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
