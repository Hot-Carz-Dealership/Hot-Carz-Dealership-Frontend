import React from "react";
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

import styles from "../css/loginhome.css";

const services = () => {
  return (
    <div>
      <div className="homepage p-3">
        <div className="px-5 mx-5">
          <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 uppercase">
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
                scheduele{" "}
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
    </div>
  );
};

export default services;
