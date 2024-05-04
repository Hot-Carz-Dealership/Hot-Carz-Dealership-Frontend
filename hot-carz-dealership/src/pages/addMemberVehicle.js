import React, { useState, useEffect } from "react"; // Import useEffect

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import httpClient from "../httpClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/creation.css";


const AddMemberVehicle = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    VIN_carID: "",
    make: "",
    model: "",
    body: "",
    year: "",
    color: "",
    mileage: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        const userData = resp.data;
        // Check if user role is either "Manager" or "superAdmin"
        console.log(userData);
        if (
          !userData.memberID
        ) {
          throw new Error("Unauthorized access");
        }

        // Store the session ID

        // Fetch service appointments and members data
      } catch (error) {
        console.log("Not Authenticated or Unauthorized");
        window.alert("You are not authorized to access this page.");
        navigate("/login");
      }
    })();
  }, [navigate]);
  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  const carData = {
      Acura: {
        ILX: years,
        Integra: years,
        RL: years,
        RSX: years,
        TL: years,
        TLX: years,
        TSX: years,
      },
      Audi: {
        A4: years,
        A6: years,
      },
      BMW: {
        "3-Series 2DR": years,
        "3-Series 4DR": years,
        "318TI": years,
        "5-Series": years,
        Z4: years,
      },
      Buick: {
        Century: years,
        Lacrosse: years,
        Lucerne: years,
        Regal: years,
      },
      Cadillac: {
        ATS: years,
        "CTS Coupe": years,
        "CTS Sedan": years,
        Catera: years,
        "Deville DTS": years,
        "El Dorado": years,
        Escalade: years,
        STS: years,
      },
      Chevrolet: {
        Aveo: years,
        Beretta: years,
        C1500: years,
        Camaro: years,
        "Camaro Z28": years,
        "Cavalier Z24": years,
        "Cobalt 2DR": years,
        "Cobalt 4DR": years,
        "Corvette C5": years,
        "Corvette C6": years,
        "Corvette C7": years,
        Cruze: years,
        Equinox: years,
        HHR: years,
        Impala: years,
        Malibu: years,
        "Malibu Maxx": years,
        Prizm: years,
        SSR: years,
        Silverado: years,
        Suburban: years,
        Tahoe: years,
        Trailblazer: years,
      },
      Chrysler: {
        200: years,
        300: years,
        "300M": years,
        Aspen: years,
        Concorde: years,
        "PT Cruiser": years,
        Sebring: years,
        "Town and Country": years,
      },
      Dodge: {
        Avenger: years,
        Caliber: years,
        Caravan: years,
        Challenger: years,
        Charger: years,
        "Charger 500": years,
        "Charger Daytona": years,
        Dart: years,
        Durango: years,
        Intrepid: years,
        Neon: years,
        Nitro: years,
        Ram: years,
        Stratus: years,
      },
      Fiat: {
        500: years,
      },
      Ford: {
        "Five Hundred": years,
        Contour: years,
        "Crown Victoria": years,
        Escape: years,
        Expedition: years,
        Explorer: years,
        Flex: years,
        "F-150": years,
        Fiesta: years,
        Focus: years,
        Fusion: years,
        "F-150 Lightning": years,
        Mustang: years,
        "Mustang GT": years,
        "Mustang GT350R": years,
        "Mustang GT500": years,
        Taurus: years,
        Thunderbird: years,
      },
      GMC: {
        Denali: years,
        Envoy: years,
        Sierra: years,
        Tahoe: years,
        Yukon: years,
      },

      Honda: {
        "Accord 2DR": years,
        "Accord 4DR": years,
        CRV: years,
        "Civic 2DR": years,
        "Civic 4DR": years,
        "Del Sol": years,
        Element: years,
        S2000: years,
      },
      Hummer: {
        H2: years,
        H3: years,
      },
      Hyundai: {
        Accent: years,
        Azera: years,
        Elantra: years,
        "Elantra Touring": years,
        "Genesis 2DR": years,
        "Genesis 4DR": years,
        "Genesis Hood Scoop": years,
        "Santa Fe": years,
        Sonata: years,
        Tiburon: years,
        "Tiburon GT-V6": years,
        Tucson: years,
      },
      Infiniti: {
        G20: years,
        "G35 2DR": years,
        "G35 4DR": years,
        "G37 2DR": years,
        "G37 4DR": years,
        "G37 Side Scoops": years,
        M35: years,
        M37: years,
        M45: years,
        Q50: years,
        Q70: years,
        QX56: years,
        I30: years,
        I35: years,
      },
      Jaguar: {
        "S-Type R": years,
        XF: years,
      },
      Jeep: {
        "Grand Cherokee": years,
        Liberty: years,
        Patriot: years,
      },
      Kia: {
        Amanti: years,
        Cadenza: years,
        "Forte Koup": years,
        "Forte Koup-R": years,
        "Forte Sedan": years,
        Optima: years,
        Rio: years,
        Rondo: years,
        Sedona: years,
        Soul: years,
        Sorento: years,
        Spectra: years,
        Sportage: years,
      },
      "Land Rover": {
        "Range Rover": years,
        "Range Rover Sport": years,
      },
      Lexus: {
        ES: years,
        GS: years,
        GS300: years,
        GS400: years,
        GX470: years,
        IS: years,
        IS250: years,
        IS300: years,
        LS460: years,
        LX470: years,
        RC: years,
        RX300: years,
      },
      Lincoln: {
        Continental: years,
        LS: years,
        MKS: years,
        MKZ: years,
        Navigator: years,
        "Navigator Hood Scoop": years,
        Zephyr: years,
      },
      Mazda: {
        "CX-7": years,
        MPV: years,
        "Mazda 3": years,
        "Mazda 5 Hatchback": years,
        "Mazda 6": years,
        "Mazda 626": years,
        "Miata MX-5": years,
        "Protege MP3": years,
        "RX-8": years,
        Tribute: years,
      },
      Mercedes: {
        "C-Class C55": years,
        "C-Class Coupe": years,
        "C-Class Sedan": years,
        CL: years,
        CLA: years,
        CLK: years,
        CLK55: years,
        CLS: years,
        "E-Class": years,
        "E-Class Convertible": years,
        "E-Class Coupe": years,
        "E-Class E63": years,
        "E-Class Sedan": years,
        GL: years,
        ML: years,
        ML320: years,
        ML430: years,
        ML500: years,
        "S-Class": years,
        SL63: years,
        SLK: years,
      },
      Mercury: {
        Cougar: years,
        "Grand Marquis": years,
        Marauder: years,
        Mariner: years,
        Milan: years,
        Montego: years,
        Mountaineer: years,
        Mystique: years,
        Sable: years,
      },
      Mitsubishi: {
        Diamante: years,
        Eclipse: years,
        "Eclipse Coupe": years,
        "Eclipse Coupe SS": years,
        Galant: years,
        Lancer: years,
        "Lancer Ralliart": years,
        Montero: years,
      },
      Nissan: {
        "300ZX": years,
        "350Z": years,
        "350Z Coupe": years,
        "350Z Roadster": years,
        "370Z": years,
        "370Z Coupe": years,
        "370Z Roadster": years,
        Altima: years,
        "Altima Coupe": years,
        "Altima SE-R": years,
        "Altima Sedan": years,
        Armada: years,
        Cube: years,
        Juke: years,
        Maxima: years,
        Pathfinder: years,
        Rogue: years,
        "Rogue Select": years,
        Sentra: years,
        "Sentra SE-R": years,
        Versa: years,
        "Versa Hatchback": years,
        "Versa Note": years,
        Xterra: years,
      },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      formData.VIN_carID === "" ||
      formData.make === "" ||
      formData.model === "" ||
      formData.body === "" ||
      formData.year === "" ||
      formData.color === "" ||
      formData.mileage === ""
    ) {
      window.alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/member/add-own-car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle");
      }

      const data = await response.json();
      console.log("Vehicle added successfully:", data);

      window.alert("Vehicle added successfully!");
      window.location.href = "/account";
    } catch (error) {
      console.error("Error adding vehicle:", error);
      window.alert("Something went wrong. Please try again.");
    }
  };

  // Function to dynamically populate the model dropdown based on the selected make
  const handleMakeChange = (e) => {
    const selectedMake = e.target.value;
    setFormData({
      ...formData,
      make: selectedMake,
      model: "", // Reset model when make changes
    });
  };
  return (
    <div className="container">
      <div className="sidebar">
        <Link to="/account" className="sidebarButton">
          Return to Account Page
        </Link>
      </div>
      <div className="mainContent">
        <h2 className="heading">Add New Vehicle</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label htmlFor="VIN_carID" className="label">
              Vin:
            </label>
            <input
              type="text"
              id="VIN_carID"
              name="VIN_carID"
              value={formData.VIN_carID}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
  
          <div className="formGroup">
            <label htmlFor="make" className="label">
              Make:
            </label>
            <select
              id="make"
              name="make"
              value={formData.make}
              onChange={handleMakeChange}
              className="input"
              required
            >
              <option value="">Select make</option>
              {/* Populate options dynamically based on carData */}
              {Object.keys(carData).map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="model" className="label">
              Model:
            </label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="input"
              required
              disabled={!formData.make} // Disable model dropdown if make is not selected
            >
              <option value="">Select model</option>
              {/* Populate options dynamically based on selected make */}
              {formData.make &&
                Object.keys(carData[formData.make]).map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
  
          <div className="formGroup">
            <label htmlFor="body" className="label">
              Body:
            </label>
            <select
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Body Type</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Pickup Truck">Pickup Truck</option>
            </select>
          </div>
  
          <div className="formGroup">
            <label htmlFor="year" className="label">
              Year:
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="input"
              required
              disabled={!formData.model} // Disable year dropdown if model is not selected
            >
              <option value="">Select year</option>
              {/* Populate options dynamically based on selected model */}
              {formData.model &&
                carData[formData.make][formData.model].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
  
          <div className="formGroup">
            <label htmlFor="color" className="label">
              Color:
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="mileage" className="label">
              Mileage:
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
  
          <button type="submit" className="submitButton">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default AddMemberVehicle;
