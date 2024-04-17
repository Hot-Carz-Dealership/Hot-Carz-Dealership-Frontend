import React, { useState, useEffect } from "react";
import engineImage from "../imgs/engine.png";
import oilChangeImage from "../imgs/oilChange.png";
import tiresImage from "../imgs/tires.png";
import { Button } from "@mui/material";
import { BASE_URL } from "../utilities/constants";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import VehicleImage from "../utilities/VehicleImage";

const HomePage = () => {
  const [randomVehicles, setRandomVehicles] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    let abortController; // Define abortController variable outside useEffect

    const fetchData = async () => {
      abortController = new AbortController(); // Initialize abortController
      try {
        // Make both API calls simultaneously
        const [randomVehiclesResponse, userResponse] = await Promise.all([
          fetchRandomVehicles(abortController),
          fetchUserData(abortController),
        ]);

        // Set state once both responses are received
        setRandomVehicles(randomVehiclesResponse);
        setUser(userResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function to abort requests when component unmounts
    return () => {
      if (abortController) {
        // Abort any ongoing requests
        abortController.abort();
      }
    };
  }, []);

  const fetchRandomVehicles = async (abortController) => {
    try {
      const response = await httpClient.get(`${BASE_URL}/api/vehicles/random`, {
        signal: abortController.signal,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch random vehicles:", error);
      return [];
    }
  };

  const fetchUserData = async (abortController) => {
    try {
      const response = await httpClient.get(`${BASE_URL}/@me`, {
        signal: abortController.signal,
      });
      console.log("User data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return null;
    }
  };

  const renderRandomVehicles = () => {
    return randomVehicles.map((vehicle, index) => (
      <li key={index} style={styles.featuredCarItem}>
        <Link to={`/cars/${vehicle.VIN_carID}`} style={styles.vehicleName}>
          <VehicleImage
            className="pr-4"
            vin={vehicle.VIN_carID}
            bodyType={vehicle.body}
          />
          <h2
            className="flex justify-center items-center h-24  text-4xl  leading-6 "
            style={styles.vehicleName}
          >{`${vehicle.make} ${vehicle.model}`}</h2>
        </Link>
      </li>
    ));
  };

  const renderWelcomeMessage = () => {
    if (user) {
      return (
        <header className="flex justify-center items-center h-24  text-4xl font-bold leading-6 ">
          Welcome to Hot Carz {user.first_name}
        </header>
      );
    } else {
      return (
        <header className="flex justify-center items-center h-24  text-4xl font-bold leading-6 ">
          Welcome to Hot Carz{" "}
        </header>
      );
    }
  };

  const styles = {
    homepage: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",

      //removed the bg color for now since most of the pages have a white background
      // backgroundColor: "#f5f5f5", // set background color for the entire website and not chopped up
    },
    welcome: {
      paddingTop: "20px",
      fontSize: "2em",
      color: "black",
      fontWeight: "bold",
      fontFamily: "Palatino",
    },
    carDisplay: {
      marginTop: "",
      padding: "20px",
      borderRadius: "5px",
    },
    carDisplayTitle: {
      fontSize: "1.5em",
      color: "red",
    },
    featuredCarList: {
      listStyle: "none",
      padding: 0,
      display: "flex",
      justifyContent: "space-between",
    },
    featuredCarItem: {
      textAlign: "center",
      flex: "1",
    },
    featuredCarImage: {
      height: "220px",
      width: "340px",
      margin: "0 auto",
    },
    searchButton: {
      backgroundColor: "red",
      color: "white",
      padding: "5px 10px",
    },
    servicesItem: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "30%",
      textAlign: "center",
      display: "inline-block",
      marginBottom: "20px",
    },
    serviceImage: {
      height: "200px",
      width: "300px",
      margin: "0 auto",
    },
    servicesDisplayTitle: {
      color: "red",
    },
    price: {
      color: "red",
    },
    bookApptButton: {
      backgroundColor: "red",
      color: "white",
      padding: "5px 10px",
      marginBottom: "20px",
      marginTop: "10px", // Add margin to separate from other content
    },
    footer: {
      marginTop: "32px",
      width: "100%",
      backgroundColor: "black",
      minHeight: "287px",
      maxWidth: "100%",
    },
    vehicleName: {
      color: "black",
      textDecoration: "none", // Remove underline
    },
  };

  return (
    <div className="homepage" style={styles.homepage}>
      {/* Header */}
      {renderWelcomeMessage()}

      <div className="carDisplay" style={styles.carDisplay}>
        <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
          Featured Cars
        </header>

        <ul
          className="featuredCarList ml-24 mr-20"
          style={styles.featuredCarList}
        >
          {renderRandomVehicles()}
        </ul>

        <Button
          variant="contained"
          className="searchButton"
          style={styles.searchButton}
          component={Link}
          to="/cars"
        >
          Search Cars
        </Button>
      </div>

      <div className="servicesDisplay" style={styles.carDisplay}>
        <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
          Our Services
        </header>
        <ul className="servicesList" style={styles.featuredCarList}>
          {/* Oil Change Service */}
          <li style={styles.servicesItem}>
            <img
              src={oilChangeImage}
              style={styles.serviceImage}
              alt="Vehicle"
            />
            <h1 className="oilChangePrice" style={styles.price}>
              $40
            </h1>
            <h2>Oil Change Service</h2>
            <p>
              Oil is the lifeblood of your car's engine. A high mileage
              synthetic blend service and fully synthetic oil change service
              with 120 PT. inspection included free.
            </p>
          </li>

          {/* Engine Tune Up */}
          <li style={styles.servicesItem}>
            <img src={engineImage} style={styles.serviceImage} alt="Vehicle" />
            <h1 className="enginePrice" style={styles.price}>
              $120
            </h1>
            <h2>Engine Tune Up</h2>
            <p>
              Get complete and comprehensive engine diagnostics and system
              evaluations for you vehicle. While Keeping your car running like
              new.
            </p>
          </li>

          {/* Tire Services */}
          <li style={styles.servicesItem}>
            <img src={tiresImage} style={styles.serviceImage} alt="Vehicle" />
            <h1 className="tiresPrice" style={styles.price}>
              $100
            </h1>
            <h2>Tire Services</h2>
            <p>
              We offer tire repair, alignments, tire balancing and tire rotation
              to help keep your tires healthy.
            </p>
          </li>
        </ul>

        <Button
          variant="contained"
          className="servicesButton"
          style={styles.searchButton}
          component={Link}
          to="/services"
        >
          GO TO SERVICE PAGE
        </Button>
      </div>

      {/* Footer */}
      <footer className="self-stretch" style={styles.footer} />
    </div>
  );
};

export default HomePage;
