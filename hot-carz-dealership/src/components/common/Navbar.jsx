import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <Link to="/" className="logo ">
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
  );
};

export default Navbar;
