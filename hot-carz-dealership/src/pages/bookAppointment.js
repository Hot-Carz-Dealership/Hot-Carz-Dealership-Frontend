import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import httpClient from "../httpClient";
import { BASE_URL } from "../utilities/constants";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import dateFormat from "dateformat";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "../css/cars.css";

const BookAppointment = () => {
  const [user, setUser] = useState(null);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [availService, setAvailService] = useState([]);
  const [cars, setCars] = useState([]);
  const [vin, setVin] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [newService, setNewService] = useState([]);

  const [serviceID, setServiceID] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  
  const handleClose = () => setOpen(false);


  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        setUser(resp.data);
      } catch (error) {
        console.log("Not Authenticated");
        window.location.href = "/login";
      }
    })();
  }, []);

  const tomorrow = dayjs().add(1, "day").set("hour", 9).startOf("hour");


  const handleSubmit = async (value) => {
    var tdDate = dateFormat(value, "yyyy-mm-dd HH:MM:ss");

    console.log(tdDate);
    console.log(serviceID);
    const name = availService.find(item => item.serviceID == serviceID);
    console.log(availService);

    const data = {
      item_name: name.service_name,
      item_price: name.price,
      serviceID: name.serviceID,
    };
    console.log(data);
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${BASE_URL}/api/member/add_to_cart`,
      requestData
    );
    const responseData = await response.json();
    window.location.href = `/checkout?VIN_carID=${vin}&appointment_date=${tdDate}&servID=${serviceID}`;
  };

  useEffect(() => {
    const recieveData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    fetch(`${BASE_URL}/api/member/vehicles`, recieveData)
      .then((data) => data.json())
      .then((val) => setCars(val));
  }, []);

  useEffect(() => {
    if (cars && cars.length > 0) {
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
    const selectedServiceID = event.target.value;
    setServiceID(selectedServiceID);
  };

  const ValueModal = ({ open, onClose }) => {
    const [value, setValue] = useState([]);
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
              <option key={i} value={opts.serviceID} >
                {opts.service_name}
              </option>
            ))}
      </select>
          <div>
            <Button onClick={() => handleSubmit(newValue)}>
              Submit
            </Button>
          </div>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Modal>
    );
  };

  const handleOpen = (vehicleVIN) => {
    const servData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
    console.log(vin);
    fetch(`${BASE_URL}/api/service-menu?vin=${vin}`, servData)
    .then((data) => data.json())
    .then((val) => setAvailService(val));

    setOpen(true);
    console.log({ vehicleVIN });
  };


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
      <ValueModal open={open} onClose={handleClose} />

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
