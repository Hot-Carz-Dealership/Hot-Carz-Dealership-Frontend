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
import EmployeeLogIn from "./pages/employeeLogin";
import CreateEmployeeAccount from "./pages/CreateEmployeeAccount";
import AddNewVehicle from "./pages/AddNewVehicle";
import SignUp from "./pages/SignUp";
import BookAppointment from "./pages/bookAppointment";
import TechnicianPage from "./pages/TechnicianPage";
import PurchaseCheckout from "./pages/PurchaseCheckout";
import PurchaseConfirmation from "./pages/PurchaseConfirmation"
import AddMemberVehicle from "./pages/addMemberVehicle";

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <Link to="/" className="logo">
            Hot Carz
          </Link>
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employeeLogIn" element={<EmployeeLogIn />} />
          <Route path="/managerPage" element={<ManagerPage />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/TechnicianPage" element={<TechnicianPage/>}/>
          <Route path="/PurchaseCheckout" element={<PurchaseCheckout/>}/>
          <Route path="/PurchaseConfirmation" element={<PurchaseConfirmation/>}/>

          <Route
            path="/create-employee-account"
            element={<CreateEmployeeAccount />}
          />
          <Route path="/add-new-vehicle" element={<AddNewVehicle />} />
          <Route path="/add-member-vehicle" element={<AddMemberVehicle />} />
          <Route path="/bookAppt" element={<BookAppointment />}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
