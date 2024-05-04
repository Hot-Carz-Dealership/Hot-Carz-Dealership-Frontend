import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import httpClient from "../httpClient";
import { BASE_URL } from "../utilities/constants";

import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import styles from "../css/bookappt.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [vin, setVin] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(
    dayjs().add(1, "day").set("hour", 9).startOf("hour")
  );
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [servicesUnderWarranty, setServicesUnderWarranty] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  useEffect(() => {
    // Fetch user data when component mounts
    const fetchData = async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);

        const user = resp.data;
        // Check if the user has a memberID
        if (!user.memberID) {
          // Display alert for employees
          // Navigate to accounts page
          navigate("/account");
        }
        else {
          setIsAuthenticated(true); // Set authentication status
        }

       // await httpClient.get(`${BASE_URL}/@me`);
      } catch (error) {
        console.log("Not Authenticated");
        // Redirect to login page or handle error
        navigate("/login");
      }
    };
  
    fetchData();

  }, [navigate]);
  

  const handleSubmit = async () => {
    const tdDate = selectedDateTime.format("YYYY-MM-DD HH:mm:ss");

    // Find selected service
    const selectedServiceObj = servicesUnderWarranty.find(
      (service) => service.serviceID === selectedService
    );
    if (!selectedServiceObj) {
      console.error("Selected service not found.");
      return;
    }

    const data = {
      item_name: selectedServiceObj.service_name,
      item_price: selectedServiceObj.price,
      serviceID: selectedServiceObj.serviceID,
    };

    // Debugging statements
    console.log("Date:", tdDate);
    console.log("Selected Service Object:", selectedServiceObj);
    console.log("Data to be sent:", data);

    try {
      const response = await fetch(`${BASE_URL}/api/member/add_to_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = `/checkout?VIN_carID=${vin}&appointment_date=${tdDate}&servID=${selectedService}`;
        // Appointment added successfully, now book service appointment
        /*
        const serviceAppointmentData = {
          appointment_date: tdDate,
          serviceID: selectedService,
          VIN_carID: vin,
        };
  
        const serviceAppointmentResponse = await fetch(`${BASE_URL}/api/member/book-service-appointment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(serviceAppointmentData),
        });
  
        if (serviceAppointmentResponse.ok) {
          // Both appointments added successfully, redirect to checkout page
          window.location.href = `/checkout?VIN_carID=${vin}&appointment_date=${tdDate}&servID=${selectedService}`;
        } else {
          // Handle error response for service appointment
          const responseData = await serviceAppointmentResponse.json();
          console.error("Error booking service appointment:", responseData);
          // Optionally display an error message to the user
        }
        */
      } else {
        // Handle error response for adding to cart
        const responseData = await response.json();
        console.error("Error adding appointment to cart:", responseData);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
      // Optionally display an error message to the user
    }
  };

  useEffect(() => {
    // Fetch vehicles when component mounts
    const fetchVehicles = async () => {
      const recieveData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/member/vehicles`,
          recieveData
        );
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Set VIN when cars data changes
    if (cars.length > 0) {
      const firstCar = cars[0];
      if (firstCar && firstCar.VIN_carID) {
        setVin(firstCar.VIN_carID);
      } else {
        console.error(
          "VIN_carID is missing in the first car object:",
          firstCar
        );
      }
    } else {
      console.warn("No cars available to set VIN.");
    }
  }, [cars]);

  // Function to get services under warranty by passing the VIN ID
  const fetchServicesUnderWarranty = async (vinID) => {
    try {
      const response = await fetch(`${BASE_URL}/api/service-menu?vin=${vinID}`);
      const data = await response.json();
      setServicesUnderWarranty(data);
    } catch (error) {
      console.error("Error fetching services under warranty:", error);
    }
  };

  return isAuthenticated ? (
    <div style={{ paddingTop: "30px" }}>
      <div className="container">
        {/* Check if no cars are fetched */}

        <div className="stepBox">
          <h2>Step 1 - Vehicles</h2>
          <h3>Choose your owned vehicle that you want to get service on:</h3>
          {cars.length === 0 && (
            <div className="warningMessage">
              <h5>No vehicles found for the member.</h5>
              <Link
                to="/add-member-vehicle"
                className="btn btn-block btn-danger"
              >
                Add new Vehicle
              </Link>{" "}
            </div>
          )}
{cars.length > 0 && (
  <div className="horizontalVehicleSelection">
    {cars.map((car, index) => (
      <Button
        key={index}
        variant="outlined"
        onClick={() => {
          setSelectedVehicle(car.VIN_carID);
          fetchServicesUnderWarranty(car.VIN_carID);
          console.log("Selected Vehicle:", car.VIN_carID);
        }}
        style={{
          backgroundColor:
            selectedVehicle === car.VIN_carID ? "#FFEFD5" : "inherit", // Light orange color
        }}
      >
        {`${car.year} ${car.make} ${car.model}`}
      </Button>
    ))}
  </div>
)}

        </div>
        <div className="stepBox">
          <h2>Step 2 - Services</h2>
          {selectedVehicle ? (
            <>
              <h3>Pick a service for your vehicle:</h3>
              <div className="horizontalVehicleSelection">
                {servicesUnderWarranty.map((service, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => {
                      setSelectedService(service.serviceID);
                      console.log("Selected Service:", service.serviceID);
                    }}
                    style={{
                      backgroundColor:
                        selectedService === service.serviceID
                          ? "#FFEFD5"
                          : "inherit", // Light orange color
                    }}
                  >
                    {service.service_name} - Price: ${service.price}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <h5>Select a vehicle first.</h5>
          )}
        </div>
        <div className="stepBox">
          <h2>Step 3 - Scheduling</h2>
          {selectedVehicle && selectedService ? (
            <div className="stepBox">
              <h3>Choose a time and date:</h3>
              <div className="dateTimePicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={selectedDateTime}
                    onChange={(newValue) => {
                      setSelectedDateTime(newValue);
                      console.log("Selected Date and Time:", newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          ) : (
            <h5>Select vehicle and service.</h5>
          )}
        </div>
        {selectedVehicle && selectedService && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2, bgcolor: "red" }}
          >
            Submit Appointment
          </Button>
        )}
      </div>
    </div>
  ) : null;
};

export default BookAppointment;
