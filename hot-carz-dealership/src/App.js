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

      <Routes >
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User Private Routes - Requires Authentication */}
        <Route path="/account" element={<Account />} />
        <Route path="/editAccount" element={<EditAccount />} />
        <Route path="/bookAppt" element={<BookAppointment />} />
        <Route path="/apply-financing" element={<ApplyFinancing />} />
        <Route path="/addons" element={<AddonsPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/add-member-vehicle" element={<AddMemberVehicle />} />

        {/* Employee Routes - Requires Special Authentication */}
        <Route path="/employeeLogIn" element={<EmployeeLogIn />} />
        <Route path="/managerPage" element={<ManagerPage />} />
        <Route path="/TechnicianPage" element={<TechnicianPage />} />
        <Route path="/create-employee-account" element={<CreateEmployeeAccount />} />
        <Route path="/add-new-vehicle" element={<AddNewVehicle />} />

      </Routes>

      
    </>
  );
}

export default App;
