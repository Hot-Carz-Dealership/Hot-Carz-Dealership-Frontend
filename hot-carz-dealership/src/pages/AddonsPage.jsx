import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../utilities/constants";
// import ReactRouterPrompt from "react-router-prompt";
// import Box from "@mui/material/Box";
import { unstable_usePrompt as Prompt } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Footer from "../components/common/Footer";

const apiUrl = `${BASE_URL}/api/vehicles/add-ons`;
const addToCartUrl = `${BASE_URL}/api/member/add_to_cart`;
window.onbeforeunload = "HELLO STINKY";

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

function BottomBar() {
  const [blockUser, setBlockUser] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false); // New state to track button click
  const navigate = useNavigate();

  useEffect(() => {
    const alertUser = (e) => {
      if (!buttonClicked) {
        // Only prevent default if button hasn't been clicked
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handleEndConcert = async () => {
      // Delete the entire cart
      await fetch(`${BASE_URL}/api/member/delete_cart`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log("I did a thing plees");
    };

    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleEndConcert);
    window.addEventListener("pagehide", handleEndConcert);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleEndConcert);
      window.removeEventListener("pagehide", handleEndConcert);
    };
  }, [buttonClicked]); // Added buttonClicked to dependency array

  const alertUser = (e) => {
    if (!buttonClicked) {
      // Only prevent default if button hasn't been clicked
      e.preventDefault();
      e.returnValue = "";
    }
  };

  const unBlockUser = () => {
    setBlockUser(false);
  };

  const handleGoToCheckout = () => {
    unBlockUser();
    setButtonClicked(true); // Set buttonClicked to true on button click
    window.removeEventListener("beforeunload", alertUser); // Remove the event listener
    navigate("/checkout");
  };

  var myElement = document.getElementById("checkout");

  myElement?.addEventListener("click", function (event) {
    unBlockUser();

    // handleGoToCheckout();
  });

  console.log(blockUser);

  return (
    <>
      {blockUser && (
        <Prompt
          when={blockUser}
          message={"If you leave this page, then your cart will be lost."}
        />
      )}
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
          id="checkout"
          onClick={handleGoToCheckout}
          variant="contained"
          color="primary"
          style={{ float: "right" }}
          className="bg-black"
        >
          Take me to checkout
        </Button>
      </div>
    </>
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
      <BottomBar />
    </>
  );
}
