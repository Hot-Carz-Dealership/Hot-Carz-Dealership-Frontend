import React from "react";
import CarInventorySearchbar from "../components/features/Car_Inv_Page/CarInventorySearchbar";
import CarInventoryGrid from "../components/features/Car_Inv_Page/CarInventoryGrid";

const Cars = () => {
  return (
    <div className="cars">
      <CarInventorySearchbar />
      <CarInventoryGrid />
    </div>
  );
};

export default Cars;
