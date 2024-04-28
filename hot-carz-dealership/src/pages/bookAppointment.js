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

const BookAppointment = () => {
  const [user, setUser] = useState(null);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [service, setService] = useState();
  const [availService, setAvailService] = useState([]);
  const [cars, setCars] = useState([]);
  const [vin, setVin] = useState(null);

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

  const [date, setDate] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(date);
    const data = {
      appointment_date: date,
      serviceID: service,
      VIN_carID: vin,
    };

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${BASE_URL}/api/member/book-service-appointment`,
      requestData
    );
    const responseData = await response.json();
    window.location.href = "/account";
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/service-menu`)
      .then((data) => data.json())
      .then((val) => setAvailService(val));

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

  return (
    <div>
      <h1>Date And Time: </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          name="date"
          id="date"
          onChange={(newValue) =>
            setDate(dateFormat(newValue, "yyyy-mm-dd HH:MM:ss"))
          }
          defaultValue={tomorrow}
          minDate={tomorrow}
          views={["year", "month", "day", "hours", "minutes"]}
        />
      </LocalizationProvider>

      <select onChange={(e) => setService(e.target.value)}>
        {availService.map((opts, i) => (
          <option key={i} value={opts.serviceID}>
            {opts.service_name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setVin(e.target.value)}>
        {cars.map((opts, i) => (
          <option key={i} value={opts.VIN_carID}>
            {opts.VIN_carID}
          </option>
        ))}
      </select>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 3, mb: 2, bgcolor: "red" }}
      >
        Submit Appointment
      </Button>
    </div>
  );
};

export default BookAppointment;
