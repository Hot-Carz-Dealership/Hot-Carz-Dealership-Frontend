import React, { useState, useEffect } from "react";

// Import all coupe images
import coupe from "../imgs/hot_wheels/coupe.png";
import coupe2 from "../imgs/hot_wheels/coupe2.png";
import coupe3 from "../imgs/hot_wheels/coupe3.png";
import coupe4 from "../imgs/hot_wheels/coupe4.png";

// Import all other images
import sedanImage1 from "../imgs/hot_wheels/sedan.png";
import sedanImage2 from "../imgs/hot_wheels/sedan2.png";
import sedanImage3 from "../imgs/hot_wheels/sedan3.png";
import sedanImage4 from "../imgs/hot_wheels/sedan4.png";

import suvImage1 from "../imgs/hot_wheels/suv.png";
import suvImage2 from "../imgs/hot_wheels/suv2.png";
import suvImage3 from "../imgs/hot_wheels/suv3.png";
import suvImage4 from "../imgs/hot_wheels/suv4.png";

import hatchbackImage1 from "../imgs/hot_wheels/hatchback.png";
import hatchbackImage2 from "../imgs/hot_wheels/hatchback2.png";
import hatchbackImage3 from "../imgs/hot_wheels/hatchback3.png";
import hatchbackImage4 from "../imgs/hot_wheels/hatchback4.png";

import vanImage1 from "../imgs/hot_wheels/van.png";
import vanImage2 from "../imgs/hot_wheels/van2.png";
import vanImage3 from "../imgs/hot_wheels/van3.png";
import vanImage4 from "../imgs/hot_wheels/van4.png";

import convertibleImage1 from "../imgs/hot_wheels/convertible.png";
import convertibleImage2 from "../imgs/hot_wheels/convertible2.png";
import convertibleImage3 from "../imgs/hot_wheels/convertible3.png";
import convertibleImage4 from "../imgs/hot_wheels/convertible4.png";

import pickupTruckImage1 from "../imgs/hot_wheels/pickup_truck.png";
import pickupTruckImage2 from "../imgs/hot_wheels/pickup_truck2.png";
import pickupTruckImage3 from "../imgs/hot_wheels/pickup_truck3.png";
import pickupTruckImage4 from "../imgs/hot_wheels/pickup_truck4.png";

const VehicleImage = ({ vin, bodyType, className }) => {
  // Define the mapping between body types and image filenames
  const imageMappings = {
    sedan: [sedanImage1, sedanImage2, sedanImage3, sedanImage4],
    SUV: [suvImage1, suvImage2, suvImage3, suvImage4],
    Hatchback: [
      hatchbackImage1,
      hatchbackImage2,
      hatchbackImage3,
      hatchbackImage4,
    ],
    van: [vanImage1, vanImage2, vanImage3, vanImage4],
    Coupe: [coupe, coupe2, coupe3, coupe4],
    convertible: [
      convertibleImage1,
      convertibleImage2,
      convertibleImage3,
      convertibleImage4,
    ],
    pickup_truck: [
      pickupTruckImage1,
      pickupTruckImage2,
      pickupTruckImage3,
      pickupTruckImage4,
    ],
  };

  // Generate a hash from the VIN to use as an index
  const getVinHash = (vin) => {
    let hash = 0;
    if (vin.length === 0) return hash;
    for (let i = 0; i < vin.length; i++) {
      const char = vin.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Get a consistent index based on the VIN hash
  const getIndexFromVin = (vin, maxIndex) => {
    const vinHash = getVinHash(vin);
    return vinHash % maxIndex;
  };

  // State to hold the selected image filename
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    // Use VIN to get a consistent index for image selection
    const index = getIndexFromVin(vin, imageMappings[bodyType].length);
    setImageIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vin, bodyType]);

  // Get the selected image
  const selectedImage = imageMappings[bodyType][imageIndex];

  return <img src={selectedImage} alt={bodyType} className={className} />;
};

export default VehicleImage;
