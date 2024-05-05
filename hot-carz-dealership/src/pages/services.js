import React, { useState, useEffect } from "react";

import engineImage from "../imgs/engine.png";
import oilChangeImage from "../imgs/oilChange.png";
import tiresImage from "../imgs/tires.png";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import heroBanner from "../imgs/services-wallpaper.jpg";
import styles from "../css/services.css";
import { BASE_URL } from "../utilities/constants";
import Footer from "../components/common/Footer";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchData = async () => {
      try {
        // Fetch services
        await fetchServices();
      } catch (error) {
        console.log("Couldn't fetch services.");
        // Redirect to login page or handle error
      }
    };
  
    fetchData(); // Call fetchData function when component mounts
  
  }, []); 
  
  const fetchServices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/service-menu`);
      const data = await response.json();
      // Update state with fetched services
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };



  return (
    <div>
      <div className="homepage p-3">
        <div className="px-5 mx-5">
          <header class="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 uppercase">
          SERVICES AT HOTCARZ
          </header>
          <div class="p-5" style={styles.homepage}>
<div className="image-container text-white relative overflow-hidden h-[600px]">
  <div className="background-image" style={{ backgroundImage: `url(${heroBanner})` }}></div>
</div>


            <div style={{ backgroundColor: 'black' }}>
  <div className="stars">
    <span className="star">&#9733;</span>
    <span className="star">&#9733;</span>
    <span className="star">&#9733;</span>
    <span className="star">&#9733;</span>
    <span className="star">&#9733;</span>
  </div>
  <div className="subtitle">
    <h2>Experience Excellence</h2>
  </div>
</div>


          </div>


          <div class="container">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <h3>ABOUT US</h3>
                <p class="text-center">At <strong>HotCarz</strong>, we handle every service with utmost care and attention to detail. Our team is dedicated to delivering exceptional quality and ensuring your satisfaction every step of the way. From brakes to engines, we go above and beyond to exceed your expectations and provide you with peace of mind. Trust us to handle your needs with care and expertise, because at <strong>HotCarz</strong>, your satisfaction is our top priority.</p>
              </div>
            </div>
          </div>

<br/>
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
          <h3>Explore more of our services: </h3>
          <div className="">
            {services.length > 0 ? (
              <>
                  {services.map((service, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{
                        color: 'red',
                        borderColor: 'red',
                        marginRight: '10px',
                      }}
                    >
                      {service.service_name} - Price: ${service.price}
                    </Button>
                  ))}
              </>
            ) : (
              <h5>services</h5>
            )}
          </div>

          <div className="d-flex justify-evenly mt-5">
            <div>
              <h1>Book Appointment</h1>
              <Button
                id="bookApptButton"
                className="cooler-reder-button"
                style={styles.searchButton}
                component={Link}
                to="/bookAppt"
              >
                schedule{" "}
              </Button>
            </div>

            <div>
              <h1>View Car Status</h1>
              <Button
                id="bookApptButton"
                className="cooler-reder-button"
                style={styles.searchButton}
                component={Link}
                to="/account"
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>

  );
};

export default Services;
