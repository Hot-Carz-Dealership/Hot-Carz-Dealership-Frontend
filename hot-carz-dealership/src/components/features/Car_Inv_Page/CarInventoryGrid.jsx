import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import { Button, Menu, MenuItem } from "@mui/material";

// Sample car data
const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    price: "$25,000",
    year: 2022,
    bodyType: "Sedan",
    image: "../../../imgs/engine.png",
  },
  {
    id: 2,
    name: "Honda Civic",
    price: "$22,500",
    year: 2021,
    bodyType: "Sedan",
    image: "../../../imgs/tires.png",
  },
  {
    id: 3,
    name: "Ford Mustang",
    price: "$23,500",
    year: 2021,
    bodyType: "Sport",
    image: "../../../imgs/oilChange.png",
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
              </List>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
};

export default CarInventoryGrid;
