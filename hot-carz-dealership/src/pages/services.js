import React from "react";
import engineImage from "../imgs/engine.png";
import oilChangeImage from "../imgs/oilChange.png";
import tiresImage from "../imgs/tires.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const services = () => {


  return (
    <div className="homepage" style={styles.homepage}>
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

        <div>
          <Button
            variant="contained"
            id="bookApptButton"
            style={styles.searchButton}
            component={Link}
            to="/bookAppt"
          >
            Book Appointment{" "}
          </Button>
        </div>

        <Button
          variant="contained"
          id="bookApptButton"
          style={styles.searchButton}
          component={Link}
          to="/account"
        >
          VIEW CAR STATUS
        </Button>
      </div>
    </div>
  );
};

export default services;
