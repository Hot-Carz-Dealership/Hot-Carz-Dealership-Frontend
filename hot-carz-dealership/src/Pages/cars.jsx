import React, { useState } from "react";
import CarInventorySearchbar from "../components/features/Car_Inv_Page/CarInventorySearchbar";
import CarInventoryGrid from "../components/features/Car_Inv_Page/CarInventoryGrid";
import { BASE_URL } from "../utilities/constants";

const Cars = () => {
  const [cars, setCars] = useState([]);

  // Function to handle search
  const handleSearch = (searchTerm) => {
    fetch(`${BASE_URL}/api/vehicles?search_query=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data); // Update cars state with search results
      })
      .catch((error) => console.error("Error searching:", error));
  };

  return (
    <div className="cars">
      <CarInventorySearchbar handleSearch={handleSearch} />
      <CarInventoryGrid searchResults={cars} />{" "}
      {/* Pass updated cars data to Grid component */}
    </div>
  );
};

export default Cars;
