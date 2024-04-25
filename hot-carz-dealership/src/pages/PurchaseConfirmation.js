import React from "react";
import { Link } from "react-router-dom";

function PurchaseConfirmation({ orderNumber, purchasedItems }) {
  // Mock data if purchasedItems is not provided
  if (!purchasedItems) {
    purchasedItems = ["Item 1", "Item 2", "Item 3"];
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-semibold mb-4">Thank you for your purchase</h1>
      {purchasedItems && purchasedItems.length > 0 ? (
        <ul className="mb-4 text-lg">
          {purchasedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">No items purchased</p>
      )}
      <p className="text-xl mb-4">Order #{orderNumber} Confirmed</p>
      <Link to="/" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Return to Home Page</Link>
    </div>
  );
}

export default PurchaseConfirmation;
