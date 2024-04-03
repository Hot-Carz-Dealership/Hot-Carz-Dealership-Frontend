// App.js
import React from "react";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Homepage from "./pages/homepage";
import Services from "./pages/services";
import Cars from "./pages/cars";
import CarDetails from "./pages/CarDetails";
import LogIn from "./pages/logIn";
import ManagerPage from "./pages/managerPage";
import Account from "./pages/account";
import EditAccount from "./pages/editAccount";
import CreateEmployeeAccount from "./pages/CreateEmployeeAccount";
import AddNewVehicle from "./pages/AddNewVehicle";


function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <div className="logo">Hot Carz</div>
          <nav className="nav">
            <Link to="/" className="button">
              Home
            </Link>
            <Link to="/cars" className="button">
              Cars
            </Link>
            <Link to="/services" className="button">
              Services
            </Link>
            <Link to="/account" className="button">
              Account
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />

          <Route path="/services" element={<Services />} />
          <Route path="/account" element={<Account />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/managerPage" element={<ManagerPage />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/create-employee-account" element={<CreateEmployeeAccount />} />
          <Route path="/add-new-vehicle" element={<AddNewVehicle />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
