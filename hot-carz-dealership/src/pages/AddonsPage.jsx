import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../utilities/constants";
import ReactRouterPrompt from "react-router-prompt";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Modal from "@mui/material/Modal";
const apiUrl = `${BASE_URL}/api/vehicles/add-ons`;
const addToCartUrl = `${BASE_URL}/api/member/add_to_cart`;

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,

    // boxShadow: 24,
    // p: 4,
  },
};
function ItemCard({ item }) {
  const { itemID, itemName, totalCost } = item;
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = () => {
    fetch(addToCartUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        item_name: itemName,
        item_price: totalCost,
        addon_ID: itemID,
        // You may need to add other data like member ID if available
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }
        return response.json();
      })
      .then((data) => {
        setAddedToCart(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <ReactRouterPrompt
        when={true}
        beforeConfirm={async () => {}}
        beforeCancel={() => {}}
      >
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            // <div className="lightbox">
            //   <div className="container">
            //     <p>Do you really want to leave?</p>
            //     <button type="button" onClick={onCancel}>
            //       Cancel
            //     </button>
            //     <button type="submit" onClick={onConfirm}>
            //       Ok
            //     </button>
            //   </div>
            // </div>
            <Modal
              open={isActive}
              onClose={onCancel}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <Box sx={styles.modal}>
                <div className="rounded-lg bg-white p-8 shadow-2xl">
                  <h2 className="text-lg font-bold">
                    Do you want to apply for financing?
                  </h2>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={onConfirm}
                      className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                    >
                      Yes
                    </button>
                    <button
                      onClick={onCancel}
                      className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                    >
                      No
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )
        }
      </ReactRouterPrompt>

      <Card
        sx={{
          flexBasis: "calc(33.33% - 100px)",
          margin: "20px",
          minHeight: 150,
        }}
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
          <Button
            onClick={handleAddToCart}
            variant="contained"
            color="error"
            disabled={addedToCart}
          >
            {addedToCart ? "Added" : "Add to Cart"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </CardContent>
      </Card>
    </>
  );
}

function Footer() {
  const handleCheckout = () => {
    // Implement redirection to /checkout
    window.location.href = "/checkout";
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
