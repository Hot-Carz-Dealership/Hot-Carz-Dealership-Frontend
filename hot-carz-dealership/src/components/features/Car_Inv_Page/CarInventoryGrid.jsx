import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button, Menu, MenuItem } from "@mui/material";
import { CardActions } from "@mui/material";

const drawerWidth = 240;

const CarInventoryGrid = () => {
  const [cars, setCars] = useState([]);
  const [selectedCarMake, setSelectedCarMake] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCarMakeSelect = (carMake) => {
    setSelectedCarMake(carMake === "None" ? null : carMake);
    setSelectedCarModel(null); // Clear selected model when make changes
  };

  const handleCarModelSelect = (carModel) => {
    setSelectedCarModel(carModel === "None" ? null : carModel);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Select Make */}
            <ListItem>
              <List disablePadding>
                <ListItem disablePadding>
                  <span>Make </span>
                </ListItem>
                <ListItem>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => handleCarMakeSelect("None")}
                    >
                      {selectedCarMake ? selectedCarMake : "Select Make"}
                    </Button>
                    {selectedCarMake && <p>Selected Make: {selectedCarMake}</p>}
                  </div>
                </ListItem>
              </List>
            </ListItem>

            {/* Select Model */}
            <ListItem>
              <List disablePadding>
                <ListItem disablePadding>
                  <span>Model </span>
                </ListItem>
                <ListItem>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => handleCarModelSelect("None")}
                      disabled={!selectedCarMake}
                    >
                      {selectedCarModel ? selectedCarModel : "Select Model"}
                    </Button>
                    {selectedCarModel && (
                      <p>Selected Model: {selectedCarModel}</p>
                    )}
                  </div>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {cars.map((car) => (
            <CarCard key={car.VIN_carID} car={car} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const CarCard = ({ car }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="200" // Set a fixed height for the image container
        image={"../../../imgs/cars/supra.png"}
        alt={car.model}
        sx={{ objectFit: "cover" }} // Maintain aspect ratio without stretching
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {car.price} <br />
          Year: {car.year} <br />
          Body Type: {car.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ backgroundColor: "red" }}>
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CarInventoryGrid;
