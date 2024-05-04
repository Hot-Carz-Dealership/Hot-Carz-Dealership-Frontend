// App.js
import React from "react";
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";

// Public Pages
import Homepage from "./pages/homepage";
import Services from "./pages/services";
import Cars from "./pages/cars";
import CarDetails from "./pages/CarDetails";
import LogIn from "./pages/logIn";
import SignUp from "./pages/SignUp";

// User Account Pages
import Account from "./pages/account";
import EditAccount from "./pages/editAccount";
import BookAppointment from "./pages/bookAppointment";
import ApplyFinancing from "./pages/ApplyFinancing";
import AddonsPage from "./pages/AddonsPage";
import Checkout from "./pages/Checkout";
import AddMemberVehicle from "./pages/addMemberVehicle";

// Employee Pages
import EmployeeLogIn from "./pages/employeeLogin";
import ManagerPage from "./pages/managerPage";
import TechnicianPage from "./pages/TechnicianPage";
import CreateEmployeeAccount from "./pages/CreateEmployeeAccount";
import AddNewVehicle from "./pages/AddNewVehicle";

function App() {
  return (
    <>
      <Navbar />

      
    </>
  );
}

export default App;
