import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, FINANCE_URL } from "../utilities/constants";
import VehicleImage from "../utilities/VehicleImage";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dateFormat from "dateformat";

// import styles from "../css/cars.css";

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,

    // boxShadow: 24,
    // p: 4,
  },
};

function VehicleInfo({ vehicleFeatures, vehicleImage }) {
  return (
    <section className="mt-12 max-w-full w-[822px] max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex items-center w-[58%] max-md:ml-0 max-md:w-full">
          {/* Use VehicleImage component instead of img tag */}
          <VehicleImage
            vin={vehicleFeatures[0].value}
            bodyType={vehicleFeatures[3].value}
            className="mx-auto"
          />
        </div>
        <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 text-xl font-light tracking-normal leading-8 text-black max-md:mt-10">
            <h2 className="text-4xl font-bold leading-7 text-center uppercase">
              Vehicle Features
            </h2>
            {vehicleFeatures.map((feature, index) => (
              <div key={index} className="mt-2">
                <span className="font-bold">{feature.label}</span> <br />
                <span>{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VehicleDetails({
  vehicleName,
  msrp,
  onScheduleTestDrive,
  vehicleVIN,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // const [sessionId, setSessionId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const tomorrow = dayjs().add(1, "day").set("hour", 9).startOf("hour");

  // const [date, setDate] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        const user = resp.data;

        setUser(user);
        // setSessionId(user.employeeID);
        setLoggedIn(true);
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
      }
    };

    fetchData();
  }, []);

  const handleOpen = (vehicleVIN) => {
    if (!loggedIn) {
      navigate("/login");
      return; // Stop execution if not logged in
    }
    setOpen(true);
    console.log({ vehicleVIN });
    if (user) {
      console.log(user.memberID);
    } else {
      console.log("User not available");
    }
  };

  const ValueModal = ({ open, onClose }) => {
    // const [value, setValue] = useState("");
    const [newValue, setNewValue] = useState(null);

    const handleTestdriveSubmit = async (value) => {
      // var x = document.getElementById("date");
      var tdDate = dateFormat(value, "yyyy-mm-dd HH:MM:ss");

      console.log(tdDate);
      console.log(vehicleVIN);

      const data = {
        VIN_carID: vehicleVIN,
        appointment_date: tdDate,
      };
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(data),
      };
      await fetch(`${BASE_URL}/api/member/book-test-drive`, requestData);
      // const responseData = await response.json();
      window.location.href = "/account";
    };

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={styles.modal}>
          <div className="rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="text-lg font-bold">
              Select Date and Time for Test Drive:
            </h2>
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

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleTestdriveSubmit(newValue)}
                className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
              >
                Submit Test Drive
              </button>
              <button
                onClick={onClose}
                className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

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
            <ValueModal open={open} onClose={handleClose} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PurchaseOptions({ VIN, price, vehicleName }) {
  const [loggedIn, setLoggedIn] = React.useState("");
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [bidModalOpen, setBidModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await httpClient.get(`${BASE_URL}/@me`);
        // const user = resp.data;

        setLoggedIn(true);
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
      }
    };

    fetchData();
  }, []);

  const handleOpenFinancingModal = () => {
    // Check if the user is logged in
    if (!loggedIn) {
      // If not logged in, redirect to the login page
      navigate("/login");
      return;
    }

    setFinancingModalOpen(true);
  };

  const handleCloseFinancingModal = () => {
    setFinancingModalOpen(false);
  };

  const handleOpenBidModal = () => {
    // Check if the user is logged in
    if (!loggedIn) {
      // If not logged in, redirect to the login page
      navigate("/login");
      return;
    }
    setBidModalOpen(true);
  };

  const handleCloseBidModal = () => {
    setBidModalOpen(false);
  };

  const handleBidSubmit = async (bidPrice) => {
    console.log("Bid submitted:", bidPrice);
    try {
      // Check if the user is logged in
      if (!loggedIn) {
        // If not logged in, redirect to the login page
        navigate("/login");
        return;
      }

      // Prepare data for the bid submission
      const bidData = {
        vin: VIN,
        bid_value: bidPrice,
      };

      // Define headers
      const headers = {
        "Content-Type": "application/json",
      };

      // Define fetch options
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bidData),
        credentials: "include", // Include credentials with the request
      };

      // Make a POST request to submit the bid with headers and credentials
      const response = await fetch(
        `${BASE_URL}/forward?route=${FINANCE_URL}/api/vehicle-purchase/new-bid-insert`,
        options
      );

      // Check if the bid was successfully inserted
      if (response.status === 201) {
        console.log("Bid successfully inserted");
        // Optionally, you can perform any additional actions here, such as closing the bid modal
        handleCloseBidModal();
        window.alert("Bid Succefully Submited");
      } else {
        const responseData = await response.json();
        console.log("Failed to insert bid:", responseData.message);
        window.alert("Bid Submission Failure. Resubmit Bid");

        // Handle error scenario if necessary
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      // Handle error scenario if necessary
    }
  };

  return (
    <section className="flex gap-5 justify-between pr-28 mt-32 max-w-full w-[921px] max-md:flex-wrap max-md:pr-5 max-md:mt-10">
      <div className="flex flex-col  uppercase">
        <h2 className="text-4xl font-bold leading-6 text-center text-black">
          Purchase At MSRP
        </h2>
        <button
          onClick={handleOpenFinancingModal}
          className="justify-center self-center px-6 py-2 mt-8 text-base font-medium leading-7 text-white bg-red-700 rounded shadow-md max-md:px-5"
        >
          Buy Now
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="text-4xl font-bold leading-6 text-center text-black">
          Enter A Bid{" "}
        </h2>
        <button
          onClick={handleOpenBidModal}
          className="justify-center self-center px-6 py-2 mt-8 text-base font-medium leading-7 text-white bg-red-700 rounded shadow-md max-md:px-5"
        >
          Bid Now
        </button>
      </div>
      <FinancingModal
        open={financingModalOpen}
        onClose={handleCloseFinancingModal}
        VIN={VIN}
        price={price}
        vehicleName={vehicleName}
      />

      <BidModal
        open={bidModalOpen}
        onClose={handleCloseBidModal}
        onBidSubmit={handleBidSubmit}
      />
    </section>
  );
}
const FinancingModal = ({ open, onClose, VIN, price, vehicleName }) => {
  const navigate = useNavigate();

  const userWantsFinancing = () => {
    console.log("User wants financing");
    navigate(
      `/apply-financing?VIN_carID=${VIN}&price=${price}&vehicleName=${encodeURIComponent(
        vehicleName
      )}`
    );
  };

  const userNoFinancing = async () => {
    console.log("User got money");
    try {
      const response = await fetch(`${BASE_URL}/api/member/add_to_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({
          item_name: vehicleName,
          item_price: price,
          VIN_carID: VIN,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Item added to cart successfully, navigate to addons page
      navigate("/addons");
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      // Handle error here, show error message to the user, etc.
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={styles.modal}>
        <div className="rounded-lg bg-white p-8 shadow-2xl">
          <h2 className="text-lg font-bold">
            Do you want to apply for financing?
          </h2>
          <div className="mt-4 flex gap-2">
            <button
              onClick={userWantsFinancing}
              className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
            >
              Yes
            </button>
            <button
              onClick={userNoFinancing}
              className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            >
              No
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

const BidModal = ({ open, onClose, onBidSubmit }) => {
  const [bidPrice, setBidPrice] = useState("");

  const handleBidSubmit = () => {
    // Ensure bid price is not empty
    if (bidPrice.trim() === "") {
      // You can show an error message here if needed
      return;
    }
    // Remove trailing dot if present
    let formattedBidPrice = bidPrice.replace(/\.$/, "");

    // Add ".00" if only one decimal digit is present
    if (/^\d+\.\d$/.test(formattedBidPrice)) {
      formattedBidPrice += "0";
    }
    // Add ".00" if no decimal digits are present
    else if (/^\d+$/.test(formattedBidPrice)) {
      formattedBidPrice += ".00";
    }

    // Pass the formatted bid price to the parent component for further processing
    onBidSubmit(formattedBidPrice);
    setBidPrice("");
    onClose();
  };

  const handlePriceChange = (event) => {
    const inputPrice = event.target.value;
    // Regex to match a price format: starts with a digit, followed by 0 or more digits, then a dot, then exactly 2 digits.
    const regex = /^\d+(\.\d{0,2})?$/;

    if (regex.test(inputPrice) || inputPrice === "") {
      setBidPrice(inputPrice);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ ...styles.modal, width: 400 }}>
        <div className="rounded-lg bg-white p-8 shadow-2xl">
          <h2 className="text-lg font-bold">Enter Your Bid</h2>
          <TextField
            label="Bid Price"
            variant="outlined"
            fullWidth
            value={bidPrice}
            placeholder="0.00"
            onChange={handlePriceChange}
            error={
              bidPrice.trim() !== "" && !/^\d+(\.\d{0,2})?$/.test(bidPrice)
            }
            helperText={
              bidPrice.trim() !== "" && !/^\d+(\.\d{0,2})?$/.test(bidPrice)
                ? "Invalid price format"
                : ""
            }
          />
          <div className="mt-4">
            <button
              onClick={handleBidSubmit}
              className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
            >
              Submit Bid
            </button>
            <button
              onClick={onClose}
              className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

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
      <PurchaseOptions
        onBuyNow={handleBuyNow}
        onBid={handleBid}
        VIN={vehicleInfo.VIN_carID}
        price={vehicleInfo.price}
        vehicleName={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
      />
      <Footer />
    </div>
  );
}

export default CarDetails;
