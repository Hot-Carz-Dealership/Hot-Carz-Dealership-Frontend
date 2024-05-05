import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, } from "react-router-dom";
import { Route } from "react-router-dom";

import Layout from "./pages/layout";

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

// Define route objects - adjust based on your route needs
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Pages */}
      <Route path="" element={<Homepage />} />{" "}
      <Route path="cars" element={<Cars />} />
      <Route path="cars/:id" element={<CarDetails />} />
      <Route path="services" element={<Services />} />
      <Route path="logIn" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />

      {/* User Private Routes - Requires Authentication */}
      <Route path="account" element={<Account />} />
      <Route path="editAccount" element={<EditAccount />} />
      <Route path="bookAppt" element={<BookAppointment />} />
      <Route path="apply-financing" element={<ApplyFinancing />} />
      <Route path="addons" element={<AddonsPage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="add-member-vehicle" element={<AddMemberVehicle />} />

      {/* Employee Routes - Requires Special Authentication */}
      <Route path="employeeLogIn" element={<EmployeeLogIn />} />
      <Route path="managerPage" element={<ManagerPage />} />
      <Route path="TechnicianPage" element={<TechnicianPage />} />
      <Route path="add-new-vehicle" element={<AddNewVehicle />} />
      <Route path="create-employee-account" element={<CreateEmployeeAccount />}
      />

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <React.StrictMode>{/* <App /> */}</React.StrictMode>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
