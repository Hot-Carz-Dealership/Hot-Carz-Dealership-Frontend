import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../utilities/constants";

const apiUrl = `${BASE_URL}/api/vehicles/add-ons`;

function ItemCard({ item }) {
  const { itemName, totalCost } = item;

  const handleAddToCart = () => {
    // Implement your add to cart functionality here
    console.log(`Item ${itemName} added to cart`);
  };

  return (
    <Card
      sx={{ flexBasis: "calc(33.33% - 100px)", margin: "20px", minHeight: 150 }}
    >
      <CardContent
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div">
            {itemName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: "auto" }}
          >
            Total Cost: ${totalCost}
          </Typography>
        </div>
        <Button onClick={handleAddToCart} variant="contained" color="error">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

function Footer() {
  const handleCheckout = () => {
    // Implement redirection to /checkout
    window.location.href = "/purchaseCheckout";
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f0f0f0",
        padding: "10px",
        borderTop: "1px solid #ddd",
      }}
    >
      <Button
        onClick={handleCheckout}
        variant="contained"
        color="primary"
        style={{ float: "right" }}
        className="bg-black"
      >
        Take me to checkout
      </Button>
    </div>
  );
}

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div>
        <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
          ADD-ONS
        </header>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {items.map((item) => (
            <ItemCard key={item.itemID} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
