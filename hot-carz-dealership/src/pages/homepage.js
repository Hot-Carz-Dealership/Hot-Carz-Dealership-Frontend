import React, { useState, useEffect } from "react";
import engineImage from "../imgs/engine.png";
import oilChangeImage from "../imgs/oilChange.png";
import tiresImage from "../imgs/tires.png";
import { Button } from "@mui/material";
import { BASE_URL } from "../utilities/constants";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import VehicleImage from "../utilities/VehicleImage";

import styles from "../css/loginhome.css";

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
      <li key={index} className="text-center">
        <Link
          to={`/cars/${vehicle.VIN_carID}`}
          className="block text-black no-underline"
        >
          <div className="flex flex-col items-center">
            <div className="h-auto w-auto mb-2">
              <VehicleImage
                className="w-full  "
                vin={vehicle.VIN_carID}
                bodyType={vehicle.body}
              />
            </div>
            <h2 className="text-xl font-semibold mt-auto">{`${vehicle.make} ${vehicle.model}`}</h2>
          </div>
        </Link>
      </li>
    ));
  };

  const renderWelcomeMessage = () => {
    const welcomeText = user
      ? `Welcome to Hot Carz ${user.first_name}`
      : `Welcome to Hot Carz`;
    return (
      <header className="flex justify-center items-center h-24 text-4xl font-bold leading-6 ">
        {welcomeText}
      </header>
    );
  };

  return (
    <div className="homepage" style={styles.homepage}>
      {/* Header */}
      {renderWelcomeMessage()}

      <div className="carDisplay p-4" style={styles.carDisplay}>
        <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
          Featured Cars
        </header>

        <ul className="featuredCarList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
