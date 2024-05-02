import React, { useState, useEffect } from "react";
import engineImage from "../imgs/engine.png";
import oilChangeImage from "../imgs/oilChange.png";
import tiresImage from "../imgs/tires.png";
import heroBanner from "../imgs/hero-banner.jpg";
import { Button } from "@mui/material";
import { BASE_URL } from "../utilities/constants";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import VehicleImage from "../utilities/VehicleImage";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Footer from "../components/common/Footer";

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

  const fetchRandomVehicles = async (abortController, numVehicles = 5) => {
    try {
      const response = await httpClient.get(
        `${BASE_URL}/api/vehicles/random?num=${numVehicles}`,
        {
          signal: abortController.signal,
        }
      );
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
          <div className="flex flex-col items-center rounded-box">
            <div className="h-auto w-auto mb-2 image">
              <VehicleImage
                className="w-full  "
                vin={vehicle.VIN_carID}
                bodyType={vehicle.body}
              />
            </div>
            <h2 className="font-semibold mt-auto text text-white">{`${vehicle.make} ${vehicle.model}`}</h2>
          </div>
        </Link>
      </li>
    ));
  };

  const renderWelcomeMessage = () => {
    const welcomeText = user
      ? `Welcome to Hot Carz, ${user.first_name}`
      : `Welcome to Hot Carz`;

    return <header className="text-white hero-title">{welcomeText}</header>;
  };

  return (
    <div className="homepage">
      <div className="p-5" style={styles.homepage}>
        <div className="image-container text-white relative overflow-hidden h-[600px]">
          <img
            alt="heroPic"
            src={heroBanner}
            class="absolute inset-0 w-full h-full object-cover"
          ></img>
          <div className="text-overlay">
            {renderWelcomeMessage()}
            {/* <div className="text-white hero-text">
              Welcome to Hot Carz, your premier destination for top-quality
              vehicles and exceptional service. Whether you're in the market for
              a sleek sedan, a rugged SUV, or a high-performance sports car,
              we've got you covered. With an extensive inventory of the hottest
              cars on the market, finding your dream ride has never been easier.
              Browse our collection online or visit our showroom today to
              experience the thrill of driving your next Hot Carz purchase. Get
              ready to turn heads and hit the road in style with Hot Carz –
              where every journey begins with passion and performance.
            </div> */}
          </div>
        </div>

        <div className="carDisplay p-4" style={styles.carDisplay}>
          <header className="sub-title mb-5 text-white">Featured Cars</header>

          <ul className="featuredCarList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {renderRandomVehicles()}
          </ul>

          <Button className="cooler-reder-button" component={Link} to="/cars">
            Search Cars
          </Button>
        </div>

        <div className="" style={styles.carDisplay}>
          <header className="flex justify-center items-center sub-title">
            Our Services
          </header>
          {/* <div
          className="d-flex w-100 justify-between gap-3 columns-3"
          style={styles.featuredCarList}
        > */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card sx={{ height: 400 }}>
                <CardMedia sx={{ height: 140 }} image={oilChangeImage} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5 text-black"
                    component="div"
                  >
                    <h1 className="oilChangePrice" style={styles.price}>
                      $40
                    </h1>
                    <h2>Oil Change Service</h2>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      Oil is the lifeblood of your car's engine. A high mileage
                      synthetic blend service and fully synthetic oil change
                      service with 120 PT. inspection included free.
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card sx={{ height: 400 }}>
                <CardMedia sx={{ height: 140 }} image={engineImage} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5 text-black"
                    component="div"
                  >
                    <h1 className="enginePrice" style={styles.price}>
                      $120
                    </h1>
                    <h2>Engine Tune Up</h2>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      Get complete and comprehensive engine diagnostics and
                      system evaluations for you vehicle. While Keeping your car
                      running like new.
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card sx={{ height: 400 }}>
                <CardMedia sx={{ height: 140 }} image={tiresImage} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5 text-black"
                    component="div"
                  >
                    <h1 className="tiresPrice" style={styles.price}>
                      $100
                    </h1>
                    <h2>Tire Services</h2>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      We offer tire repair, alignments, tire balancing and tire
                      rotation to help keep your tires healthy.
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            className="cooler-reder-button mt-5"
            style={styles.searchButton}
            component={Link}
            to="/services"
          >
            GO TO SERVICE PAGE
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
