import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItem,
  Card,
  CardContent,
  TextField,
  Button,
  Menu,
  MenuItem,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utilities/constants";
import VehicleImage from "../../../utilities/VehicleImage";
// import Footer from "../../common/Footer";

const drawerWidth = 240;

const CarInventoryGrid = ({ searchResults }) => {
  const [makeAnchorEl, setMakeAnchorEl] = useState(null);
  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]);
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);

  const [selectedCarMake, setSelectedCarMake] = useState(null);
  const [modelAnchorEl, setModelAnchorEl] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);

  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [carColors, setCarColors] = useState([]);
  useEffect(() => {
    fetchCars();
  }, []);

  // Update cars state when search data changes
  useEffect(() => {
    setCars(searchResults);
    setOriginalCars(searchResults);
  }, [searchResults]);

  const fetchCars = () => {
    fetch(`${BASE_URL}/api/vehicles/search`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setOriginalCars(data);
        // Extract unique car makes
        const makes = [...new Set(data.map((car) => car.make))];
        setCarMakes(["None", ...makes]);
        // Extract car models for each make
        const models = {};
        makes.forEach((make) => {
          const makeModels = data
            .filter((car) => car.make === make)
            .map((car) => car.model);
          models[make] = ["None", ...new Set(makeModels)];
        });
        setCarModels(models);
        // Extract unique colors
        const colors = [...new Set(data.map((car) => car.color))];
        setCarColors(["Any", ...colors]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

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

  const handleFilter = () => {
    // Filter cars based on current input values
    const filteredCars = originalCars.filter((car) => {
      return (
        (!selectedCarMake || car.make === selectedCarMake) &&
        (!selectedCarModel || car.model === selectedCarModel) &&
        (!minYear || parseInt(car.year) >= parseInt(minYear)) &&
        (!maxYear || parseInt(car.year) <= parseInt(maxYear)) &&
        (!minMileage || parseInt(car.mileage) >= parseInt(minMileage)) &&
        (!maxMileage || parseInt(car.mileage) <= parseInt(maxMileage)) &&
        (!selectedColor || car.color === selectedColor) &&
        (!minPrice || parseInt(car.price) >= parseInt(minPrice)) &&
        (!maxPrice || parseInt(car.price) <= parseInt(maxPrice))
      );
    });
    return filteredCars;
  };

  const resetFilters = () => {
    setSelectedCarMake(null);
    setSelectedCarModel(null);
    setMinYear("");
    setMaxYear("");
    setMinMileage("");
    setMaxMileage("");
    setSelectedColor("");
    setMinPrice("");
    setMaxPrice("");
  };

  // Apply filtering function after resetting filters using useEffect
  useEffect(() => {
    setCars(handleFilter());
    // eslint-disable-next-line
  }, [
    selectedCarMake,
    selectedCarModel,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    selectedColor,
    minPrice,
    maxPrice,
  ]);

  const buttonStyle = {
    minWidth: "160px", // Set a constant minimum width for the buttons
  };

  return (
    <div>
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
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value)}
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
                      value={maxYear}
                      onChange={(e) => setMaxYear(e.target.value)}
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
                      id="minMileage-number"
                      label="Min"
                      type="number"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={minMileage}
                      onChange={(e) => setMinMileage(e.target.value)}
                    />
                    <span className="mr-2 ml-2">to</span>
                    <TextField
                      id="maxMileage-number"
                      label="Max"
                      type="number"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={maxMileage}
                      onChange={(e) => setMaxMileage(e.target.value)}
                    />
                  </ListItem>
                </List>
              </ListItem>

              {/* Price */}
              <ListItem disablePadding>
                <List disablePadding>
                  <ListItem>
                    <span>Price </span>
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="minPrice-number"
                      label="Min"
                      type="number"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span className="mr-2 ml-2">to</span>
                    <TextField
                      id="maxPrice-number"
                      label="Max"
                      type="number"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </ListItem>
                </List>
              </ListItem>
              {/* Color */}
              <ListItem disablePadding>
                <List disablePadding>
                  <ListItem>
                    <span>Color </span>
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="color-select"
                      select
                      // label="Select"
                      value={selectedColor}
                      size="small"
                      onChange={(e) => setSelectedColor(e.target.value)}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {carColors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </TextField>
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

                      {/* {selectedCarMake && <p>Selected Make: {selectedCarMake}</p>} */}
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

                      {/* {selectedCarModel && (
                      <p>Selected Model: {selectedCarModel}</p>
                    )} */}
                    </div>
                  </ListItem>
                  <ListItem></ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "black" }}
                      onClick={() => setCars(handleFilter)}
                    >
                      Apply Filter
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "grey" }}
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {cars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* {cars.length > 0 && <Footer />} */}
    </div>
  );
};

const CarCard = ({ car }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, padding: 3 }}>
      <div
        style={{
          height: 200,
          width: 300,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <CardMedia
          component="img"
          image={car.pictureLibraryLink}
          alt={car.model}
          style={{ height: "100%", width: "auto" }}
        /> */}
        {/* Replace CardMedia with VehicleImage component */}
        <VehicleImage
          vin={car.VIN_carID}
          bodyType={car.body}
          className="w-auto h-64"
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.make} {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {car.price} <br />
          Year: {car.year} <br />
          Mileage: {car.mileage} <br />
          Body Type: {car.body} <br />
          Color: {car.color}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          component={Link}
          to={`/cars/${car.VIN_carID}`} // Dynamically generate URL
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CarInventoryGrid;
