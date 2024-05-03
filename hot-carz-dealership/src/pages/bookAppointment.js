import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import httpClient from "../httpClient";
import { BASE_URL } from "../utilities/constants";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {  TextField,  } from "@mui/material";

import styles from "../css/bookappt.css";

const BookAppointment = () => {
  const [availService, setAvailService] = useState([]);
  const [cars, setCars] = useState([]);
  const [vin, setVin] = useState(null);
  const [serviceID, setServiceID] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs().add(1, "day").set("hour", 9).startOf("hour"));
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [servicesUnderWarranty, setServicesUnderWarranty] = useState([]);
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchData = async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
      } catch (error) {
        console.log("Not Authenticated");
        // Redirect to login page or handle error
      }
    };
    fetchData();
  }, []);

  const tomorrow = dayjs().add(1, "day").set("hour", 9).startOf("hour");

  const handleSubmit = async (value) => {
    // Format date
    const tdDate = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    console.log(tdDate);
    console.log(serviceID);

    // Find selected service
    const selectedService = availService.find((item) => item.serviceID === serviceID);
    console.log(availService);

    const data = {
      item_name: selectedService.service_name,
      item_price: selectedService.price,
      serviceID: selectedService.serviceID,
    };

    // Add to cart
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/api/member/add_to_cart`, requestData);
    const responseData = await response.json();
    console.log(responseData);

    // Redirect to checkout page
    window.location.href = `/checkout?VIN_carID=${vin}&appointment_date=${tdDate}&servID=${serviceID}`;
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
        const response = await fetch(`${BASE_URL}/api/member/vehicles`, recieveData);
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
        console.error("VIN_carID is missing in the first car object:", firstCar);
      }
    } else {
      console.warn("No cars available to set VIN.");
    }
  }, [cars]);

  const handleChange = (event) => {
    // Update selected service ID
    const selectedServiceID = event.target.value;
    setServiceID(selectedServiceID);
  };

  /*
  const ValueModal = ({ open, onClose }) => {
    const [newValue, setNewValue] = useState(null);

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Select Date and Time for Test Drive:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              name="date"
              id="date"
              onChange={(newValue) => setNewValue(newValue)}
              defaultValue={tomorrow}
              minDate={tomorrow}
              views={["year", "month", "day", "hours", "minutes"]}
            />
          </LocalizationProvider>
          <select id="service" onChange={handleChange}>
            {availService.map((opts, i) => (
              <option key={i} value={opts.serviceID}>
                {opts.service_name}
              </option>
            ))}
          </select>
          <div>
            <Button onClick={() => handleSubmit(newValue)}>Submit</Button>
          </div>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Modal>
    );
  };
*/

  const handleOpen = async () => {
    // Fetch available services when modal opens
    const servData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const response = await fetch(`${BASE_URL}/api/service-menu?vin=${vin}`, servData);
      const data = await response.json();
      setAvailService(data);
    } catch (error) {
      console.error("Error fetching available services:", error);
    }
  };
/*
  return (
    <div>
      <h1>Date And Time: </h1>

      <select onChange={(e) => setVin(e.target.value)}>
        {cars.map((opts, i) => (
          <option key={i} value={opts.VIN_carID}>
            {opts.VIN_carID}
          </option>
        ))}
      </select>
      <ValueModal open={open} onClose={() => setOpen(false)} />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleOpen}
        sx={{ mt: 3, mb: 2, bgcolor: "red" }}
      >
        Submit Appointment
      </Button>
    </div>
  );
  */


  // Function to fetch all services
  const fetchAllServices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/service-menu`);
      const data = await response.json();
      setAllServices(data);
    } catch (error) {
      console.error('Error fetching all services:', error);
    }
  };


// Function to get services under warranty by passing the VIN ID
const fetchServicesUnderWarranty = async (vinID) => {
  try {
    const response = await fetch(`${BASE_URL}/api/service-menu?vin=${vinID}`);
    const data = await response.json();
    setServicesUnderWarranty(data);
  } catch (error) {
    console.error('Error fetching services under warranty:', error);
  }
};

useEffect(() => {
  fetchAllServices();
}, []); 

  return (
    <div className="container">
      <div className="stepBox">
        <h2>Step 1</h2>
        <h3>Choose your owned vehicle that you want to get service on:</h3>
        <div className="horizontalVehicleSelection">
        {cars.map((car, index) => (
            <Button key={index} variant="outlined" onClick={() => { setSelectedVehicle(car.VIN_carID); fetchServicesUnderWarranty(car.VIN_carID); }}>
              {`${car.year} ${car.make} ${car.model}`}
            </Button>
          ))}
        </div>
      </div>
      <div className="stepBox">
        <h2>Step 2</h2>
        <h3>All Services:</h3>
        <div className="horizontalVehicleSelection">

        {allServices.map((service, index) => (
          <button key={index}>{service.service_name} - Price: ${service.price}</button>
        ))}

        </div>
        d
        {selectedVehicle && (
          <>
            <h3>Services Under Warranty for Selected Vehicle:</h3>
            {servicesUnderWarranty.map((service, index) => (
              <div key={index}>{service.service_name} - Price: $0.00 (Under Warranty)</div>
            ))}
          </>
        )}
      </div>
      <div className="stepBox">
      <h2>Step 3</h2>
        <h3>Choose a time and date:</h3>
        <div className="dateTimePicker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={selectedDateTime}
              onChange={(newValue) => setSelectedDateTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleOpen}
        sx={{ mt: 3, mb: 2, bgcolor: "red" }}
      >
        Submit Appointment
      </Button>
    </div>
  );
};

export default BookAppointment;
