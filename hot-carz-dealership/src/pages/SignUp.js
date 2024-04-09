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
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    driversLicense: false,
    username: false,
    password: false,
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;

    // Validate first name and last name
    if (name === "firstName" || name === "lastName") {
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
    if (name === "driversLicense") {
      isValid = /^[a-zA-Z0-9]{1,15}$/.test(value); // Assuming driver's license ID is up to 15 characters long and alphanumeric
    }

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value.trim() !== "" && isValid,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const allFieldsFilled = Object.values(fields).every((field) => field);
    if (allFieldsFilled) {
      const data = new FormData(event.currentTarget);

      console.log({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        username: data.get("username"),
        phone: data.get("phone"),
        password: data.get("password"),
        driversLicense: data.get("driversLicense"),
      });
    } else {
      //   alert("Please fill out all fields.");
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
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  error={formSubmitted && !fields.firstName}
                  helperText={formSubmitted && !fields.firstName && "Required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  error={formSubmitted && !fields.lastName}
                  helperText={formSubmitted && !fields.lastName && "Required"}
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
                  id="driversLicense"
                  label="Driver's License ID"
                  name="driversLicense"
                  onChange={handleChange}
                  error={formSubmitted && !fields.driversLicense}
                  helperText={
                    formSubmitted &&
                    !fields.driversLicense &&
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
