import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utilities/constants";

const Navbar = () => {
  // Function to delete the cart
  const deleteCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/member/delete_cart`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Cart successfully deleted.");
      } else {
        console.error("Failed to delete cart:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while deleting the cart:", error);
    }
  };

  // Function to handle link click
  const handleLinkClick = async () => {
    await deleteCart(); // Delete the cart before navigating to the link
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Hot Carz
      </Link>
      <nav className="nav">
        <Link to="/" className="button" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/cars" className="button" onClick={handleLinkClick}>
          Cars
        </Link>
        <Link to="/services" className="button" onClick={handleLinkClick}>
          Services
        </Link>
        <Link to="/account" className="button" onClick={handleLinkClick}>
          Account
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
