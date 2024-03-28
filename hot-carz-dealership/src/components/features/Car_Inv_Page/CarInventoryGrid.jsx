import React, { useState } from "react";
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

// Sample car data
const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    price: "$25,000",
    year: 2022,
    bodyType: "Sedan",
    image:
      "https://github.com/TheHungryGuy/Hot-Carz-Dealership-Frontend/blob/feature/antonio/car_inv_page/hot-carz-dealership/src/imgs/engine.png?raw=true",
  },
  {
    id: 2,
    name: "Honda Civic",
    price: "$22,500",
    year: 2021,
    bodyType: "Sedan",
    image:
      "https://github.com/TheHungryGuy/Hot-Carz-Dealership-Frontend/blob/feature/antonio/car_inv_page/hot-carz-dealership/src/imgs/oilChange.png?raw=true",
  },
  {
    id: 3,
    name: "Ford Mustang",
    price: "$23,500",
    year: 2021,
    bodyType: "Sport",
    image:
      "https://github.com/TheHungryGuy/Hot-Carz-Dealership-Frontend/blob/feature/antonio/car_inv_page/hot-carz-dealership/src/imgs/tires.png?raw=true",
  },
  // Add more cars as needed
];

// Example lists of car makes and models
const carMakes = [
  "None",
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Audi",
  "Mercedes-Benz",
];
const carModels = {
  Toyota: ["None", "Camry", "Corolla", "Rav4"],
  Honda: ["None", "Civic", "Accord", "CR-V"],
  Ford: ["None", "F-150", "Escape", "Mustang"],
  // Add more models for other makes as needed
};

const drawerWidth = 240;

const CarInventoryGrid = () => {
  const [makeAnchorEl, setMakeAnchorEl] = useState(null);
  const [selectedCarMake, setSelectedCarMake] = useState(null);
  const [modelAnchorEl, setModelAnchorEl] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);

  const handleOpenMakeMenu = (event) => {
    setMakeAnchorEl(event.currentTarget);
  };

  const handleCloseMakeMenu = () => {
    setMakeAnchorEl(null);
  };

  const handleCarMakeSelect = (carMake) => {
    setSelectedCarMake(carMake === "None" ? null : carMake);
    setSelectedCarModel(null); // Clear selected model when make changes
    handleCloseMakeMenu();
  };

  const handleOpenModelMenu = (event) => {
    setModelAnchorEl(event.currentTarget);
  };

  const handleCloseModelMenu = () => {
    setModelAnchorEl(null);
  };

  const handleCarModelSelect = (carModel) => {
    setSelectedCarModel(carModel === "None" ? null : carModel);
    handleCloseModelMenu();
  };

  const buttonStyle = {
    minWidth: "160px", // Set a constant minimum width for the buttons
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      ></AppBar>
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
            {/* Years */}
            <ListItem disablePadding>
              <List disablePadding>
                <ListItem>
                  <span>Years </span>
                </ListItem>
                <ListItem>
                  <TextField
                    id="minYear-number"
                    label="Min"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <span className="mr-2 ml-2">to</span>
                  <TextField
                    id="maxYear-number"
                    label="Max"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
              </List>
            </ListItem>
            {/* Mileage */}
            <ListItem disablePadding>
              <List disablePadding>
                <ListItem>
                  <span>Milage </span>
                </ListItem>
                <ListItem>
                  <TextField
                    id="minMilage-number"
                    label="Min"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <span className="mr-2 ml-2">to</span>
                  <TextField
                    id="maxMilage-number"
                    label="Max"
                    type="number"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
              </List>
            </ListItem>

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
                      sx={{ backgroundColor: "red" }}
                      onClick={handleOpenMakeMenu}
                      aria-controls="car-make-menu"
                      aria-haspopup="true"
                      style={buttonStyle}
                    >
                      {selectedCarMake ? selectedCarMake : "Select Make"}
                    </Button>
                    <Menu
                      id="car-make-menu"
                      anchorEl={makeAnchorEl}
                      open={Boolean(makeAnchorEl)}
                      onClose={handleCloseMakeMenu}
                    >
                      {carMakes.map((carMake, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleCarMakeSelect(carMake)}
                        >
                          {carMake}
                        </MenuItem>
                      ))}
                    </Menu>

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
                      sx={{ backgroundColor: "red" }}
                      onClick={handleOpenModelMenu}
                      aria-controls="car-model-menu"
                      aria-haspopup="true"
                      disabled={!selectedCarMake}
                      style={buttonStyle}
                    >
                      {selectedCarModel ? selectedCarModel : "Select Model"}
                    </Button>
                    <Menu
                      id="car-model-menu"
                      anchorEl={modelAnchorEl}
                      open={Boolean(modelAnchorEl)}
                      onClose={handleCloseModelMenu}
                    >
                      {selectedCarMake &&
                        carModels[selectedCarMake] &&
                        carModels[selectedCarMake].map((carModel, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleCarModelSelect(carModel)}
                          >
                            {carModel}
                          </MenuItem>
                        ))}
                    </Menu>

                    {selectedCarModel && (
                      <p>Selected Model: {selectedCarModel}</p>
                    )}
                  </div>
                </ListItem>
                <ListItem></ListItem>
                <ListItem>
                  <Button variant="contained" sx={{ backgroundColor: "black" }}>
                    Apply Filter
                  </Button>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {/* {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))} */}

          {[...Array(10)].map((_, index) => (
            <React.Fragment key={index}>
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </React.Fragment>
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
        // height="140"
        image={car.image}
        alt={car.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {car.price} <br />
          Year: {car.year} <br />
          Body Type: {car.bodyType}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions>
        <Button variant="contained" sx={{ backgroundColor: "red" }}>
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CarInventoryGrid;
