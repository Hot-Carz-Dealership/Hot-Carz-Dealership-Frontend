import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import httpClient from "../httpClient";
import { BASE_URL } from "../utilities/constants";




const BookAppointment = () => {

    const [user, setUser] = useState(null);
    const [formSubmitted, setFormSubmitted] = React.useState(false);


      useEffect(() => {
        (async () => {
          try {
            const resp = await httpClient.get("//localhost:5000/@me");
            setUser(resp.data);
          } catch (error) {
            console.log("Not Authenticated");
          }
        })();
      }, []);

    const tomorrow = dayjs().add(1, 'day');
    const fivePM = dayjs().set('hour', 17).startOf('hour');
    const nineAM = dayjs().set('hour', 9).startOf('hour');
    const [value, setValue] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch(`${BASE_URL}/api/customers/book-service-appointment`,)
    }


  return (
    <div>
        <h1>Date And Time: </h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker value={value} onChange={(newValue) => setValue(newValue)}
            minDate={tomorrow}
            defaultValue={nineAM} 
            minTime={nineAM}
            maxTime={fivePM}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </LocalizationProvider>



        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "red" }}
            >
              Submit Appointment
        </Button>
    </div>
  )


}

export default BookAppointment;
