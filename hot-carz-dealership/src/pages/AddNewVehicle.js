import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";


const AddNewVehicle = () => {
  const [formData, setFormData] = useState({
    VIN_carID: "",
    make: "",
    model: "",
    body: "",
    year: "",
    color: "",
    mileage: "",
    details: "",
    description: "",
    status: "new", // Default value
    price: "",
  });

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
      formData.VIN_carID === '' ||

      formData.make === '' ||
      formData.model === '' ||
      formData.body === '' ||
      formData.year === '' ||
      formData.color === '' ||
      formData.mileage === '' ||
      formData.details === '' ||
      formData.description === '' ||
      formData.price === ''
    ) {
      window.alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/vehicles/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }

      const data = await response.json();
      console.log("Vehicle added successfully:", data);

      window.alert("Vehicle added successfully!");

    } catch (error) {
      console.error("Error adding vehicle:", error);
      window.alert("Something went wrong. Please try again.");
    }
  };




  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Link to="/managerPage" style={styles.sidebarButton}>
          Return to Manager Page
        </Link>
      </div>
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Add New Vehicle</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="VIN_carID" style={styles.label}>
              Vin:
            </label>
            <input
              type="text"
              id="VIN_carID"
              name="VIN_carID"
              value={formData.VIN_carID}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="make" style={styles.label}>
              Make:
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="model" style={styles.label}>
              Model:
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="body" style={styles.label}>
              Body:
            </label>
            <select
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Body Type</option>
              <option value="sedan">Sedan</option>
              <option value="coupe">Coupe</option>
              <option value="hatchback">Hatchback</option>
              <option value="convertible">Convertible</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="year" style={styles.label}>
              Year:
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="color" style={styles.label}>
              Color:
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="mileage" style={styles.label}>
              Mileage:
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="details" style={styles.label}>
              Details:
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              required
            ></textarea>
          </div>


          <div style={styles.formGroup}>
            <label htmlFor="status" style={styles.label}>
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="new">New</option>
              <option value="sold">Sold</option>
              <option value="low-mileage">Low Mileage</option>
              <option value="being-watched">Being Watched</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="price" style={styles.label}>
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );

};

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    flex: "0 0 200px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  sidebarButton: {
    display: "block",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    marginBottom: "10px",
  },
  mainContent: {
    flex: "1",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default AddNewVehicle;
