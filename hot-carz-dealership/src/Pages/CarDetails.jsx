import React from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams(); // Extract VIN_carID from URL

  return (
    <div>
      <h2>Details for Car ID: {id}</h2>
      {/* Display car details */}
    </div>
  );
};

export default CarDetails;
