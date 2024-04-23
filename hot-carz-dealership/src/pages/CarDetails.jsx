import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import VehicleImage from "../utilities/VehicleImage";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dateFormat from 'dateformat';

const styles = {
  tablespacing: {
    marginTop: '20px',
  },
  modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    border: "2px solid black",
  },
  th: {
    border: "2px solid black",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "2px solid black",
    padding: "8px",
    textAlign: "left",
  },
  creationButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "20px",
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    margin: "10px 0",
  },
  selected: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  edit: {
    background: "none",
    border: "none",
    padding: 0,
    marginRight: "5px",
    cursor: "pointer",
  },
  delete: {
    background: "none",
    border: "none",
    padding: 0,
    marginRight: "5px",
    cursor: "pointer",
  },
  editIcon: {
    width: "20px",
    height: "20px",
  },
  deleteIcon: {
    width: "20px",
    height: "20px",
  },
  tableWrapper: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "rgba(128, 128, 128, 0.1)"
  },
  welcomeScreen: {
    textAlign: "center",
    marginTop: "100px", // Adjust as needed
    padding: "50px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
  },
  welcomeScreenHeading: {
    fontSize: "2.5em",
    marginBottom: "20px",
  },
  welcomeScreenText: {
    fontSize: "1.2em",
    marginBottom: "30px",
  },
  welcomeScreenButton: {
    fontSize: "1.2em",
  },
  largeTextStyle: {
    fontSize: "2em",
  },
  paper: {
  },
};


function VehicleInfo({ vehicleFeatures, vehichleImage }) {
  return (
    <section className="mt-12 max-w-full w-[822px] max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
          {/* <img
            loading="lazy"
            src={vehichleImage}
            alt="Vehicle"
            className=" mt-20"
          /> */}{" "}
          {/* Use VehicleImage component instead of img tag */}
          <VehicleImage
            vin={vehicleFeatures[0].value}
            bodyType={vehicleFeatures[3].value}
          />
        </div>
        <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch px-5 my-auto text-xl font-light tracking-normal leading-8 text-black max-md:mt-10">
            <h2 className="text-4xl font-bold  leading-7 text-center uppercase">
              Vehicle Features
            </h2>
            {vehicleFeatures.map((feature, index) => (
              <div key={index} className="mt-2 ">
                <span className="font-bold">{feature.label}</span> <br />
                <span className="">{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VehicleDetails({ vehicleName, msrp, onScheduleTestDrive , vehicleVIN}) {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const tomorrow = dayjs().add(1, 'day').set('hour', 9).startOf('hour');

  const [date, setDate] = React.useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        const user = resp.data;

        setUser(user);
        setSessionId(user.employeeID);
        setLoggedIn(true);
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
      }
    };

    fetchData();
  }, [navigate]);




  const handleOpen = (vehicleVIN) => {
    if(loggedIn == false){
      navigate("/login");
    }
    setOpen(true);
    console.log({vehicleVIN});
    console.log(user.memberID);
  }

  const ValueModal = ({ open, onClose }) => {
    
    const [value, setValue] = useState('');
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
        <DateTimePicker name="date" id="date" onChange={(newValue) => setNewValue(newValue)}
            defaultValue={tomorrow}
            minDate={tomorrow}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          /> 
        </LocalizationProvider>

          <div>  
            <Button onClick={() => handleTestdriveSubmit(newValue)}>Submit Test Drive</Button>
          </div>
        
        <Button onClick={onClose}>Close</Button>
      </Box>
      </Modal>
    );
  };
  const handleTestdriveSubmit = async (value) =>{
    var x = document.getElementById("date");
    var tdDate = dateFormat(value, "yyyy-mm-dd HH:MM:ss");

    console.log(tdDate);
    console.log(vehicleVIN);


    const data = {
      VIN_carID: vehicleVIN,
      appointment_date: tdDate,
    }
    const requestData = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify(data)
    }
    //const response = await fetch("endpoint for booking testdrive", requestData);
    //const responseData = await response.json();
  }




  return (
    <section className="mt-16 max-w-full w-[921px] max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 text-4xl font-bold  leading-6 text-center uppercase max-md:mt-10">
            <h2 className="text-black">{vehicleName}</h2>
            <div className="self-center mt-14 text-red-500 max-md:mt-10">
              {msrp} MSrP
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5  uppercase max-md:mt-10">
            <h2 className="text-4xl font-bold leading-7 text-center text-black">
              Schedule a Test Drive
            </h2>
            <button
              onClick={() => handleOpen(vehicleVIN)}
              className="justify-center self-center px-6 py-2 mt-12 text-base font-medium leading-7 text-white whitespace-nowrap bg-red-700 rounded shadow-md max-md:px-5 max-md:mt-10"
            >
              Schedule
            </button>
            <ValueModal open={open} onClose={handleClose}/>
          </div>
        </div>
      </div>
    </section>
  );
}


function PurchaseOptions({ onBuyNow, onBid }) {
  const [bidPrice, setBidPrice] = React.useState("");

  const handleBidPriceChange = (event) => {
    setBidPrice(event.target.value);
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();
    onBid(bidPrice);
  };

  return (
    <section className="flex gap-5 justify-between pr-12 mt-32 max-w-full w-[921px] max-md:flex-wrap max-md:pr-5 max-md:mt-10">
      <div className="flex flex-col  uppercase">
        <h2 className="text-4xl font-bold leading-6 text-center text-black">
          Purchase At MSRP
        </h2>
        <button
          onClick={onBuyNow}
          className="justify-center self-center px-6 py-2 mt-8 text-base font-medium leading-7 text-white bg-red-700 rounded shadow-md max-md:px-5"
        >
          Buy Now
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="self-center text-4xl font-bold  leading-6 text-center text-black uppercase">
          Bid on Price
        </h2>
        <form onSubmit={handleBidSubmit} className="flex gap-px mt-8">
          <label
            htmlFor="bidPrice"
            className="pb-8 text-xs tracking-normal leading-3 rounded text-black text-opacity-60"
          >
            Enter Bid Price
          </label>
          <input
            type="number"
            id="bidPrice"
            value={bidPrice}
            onChange={handleBidPriceChange}
            className="sr-only"
            aria-label="Enter Bid Price"
          />
          <button
            type="submit"
            className="justify-center self-start px-6 py-2 text-base font-medium  leading-7 text-white uppercase whitespace-nowrap bg-red-700 rounded shadow-md max-md:px-5"
          >
            Bid
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="self-stretch mt-32 w-full bg-black min-h-[287px] max-md:mt-10 max-md:max-w-full" />
  );
}

function CarDetails() {
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  



  useEffect(() => {
    const fetchVehicleInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/vehicles?vin=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setVehicleInfo(data);
          setError(null);
        } else {
          setError(data.message);
          setVehicleInfo(null);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
        setVehicleInfo(null);
      }
    };

    fetchVehicleInfo();
  }, [id]);

  const handleScheduleTestDrive = () => {
    // Implement test drive scheduling logic here
    console.log("Scheduling test drive...");
  };

  const handleBuyNow = () => {
    // Implement buy now logic here
    console.log("Buying now...");
  };

  const handleBid = (bidPrice) => {
    // Implement bid logic here
    console.log(`Bidding with price: ${bidPrice}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicleInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center ">
      <h1 className="mt-16 text-6xl font-bold leading-5 text-center text-red-500 uppercase max-md:mt-10 max-md:text-4xl">
        Vehicle Info
      </h1>
      <VehicleInfo
        vehicleFeatures={[
          { label: "VIN", value: vehicleInfo.VIN_carID },
          { label: "Make", value: vehicleInfo.make },
          { label: "Model", value: vehicleInfo.model },
          { label: "Body", value: vehicleInfo.body },
          { label: "Year", value: vehicleInfo.year },
          { label: "Color", value: vehicleInfo.color },
          { label: "Mileage", value: vehicleInfo.mileage },
          // { label: "Details", value: vehicleInfo.details },
        ]}
        vehichleImage={vehicleInfo.pictureLibraryLink}
      />
      <VehicleDetails
        vehicleName={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
        msrp={`$${vehicleInfo.price}`}
        onScheduleTestDrive={handleScheduleTestDrive}
        vehicleVIN={vehicleInfo.VIN_carID}
      />
      <PurchaseOptions onBuyNow={handleBuyNow} onBid={handleBid} />
      <Footer />
    </div>
  );
}

export default CarDetails;
