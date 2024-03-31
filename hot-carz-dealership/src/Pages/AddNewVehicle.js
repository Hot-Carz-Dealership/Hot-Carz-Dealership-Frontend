

import React, { useState } from 'react';

const AddNewVehicle = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        body: '',
        year: '',
        color: '',
        mileage: '',
        details: '',
        description: '',
        inStock: 'yes', // Default value
        stockAmount: '',
        status: 'new', // Default value
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can submit the formData to your backend API to create a new car listing
        console.log(formData); // Just logging the form data for demonstration
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <Link to="/managerPage" style={styles.sidebarButton}>Return to Manager Page</Link>
            </div>
            <div style={styles.mainContent}>
                <h2 style={styles.heading}>Add New Vehicle</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="make" style={styles.label}>Make:</label>
                        <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="model" style={styles.label}>Model:</label>
                        <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="body" style={styles.label}>Body:</label>
                        <input type="text" id="body" name="body" value={formData.body} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="year" style={styles.label}>Year:</label>
                        <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="color" style={styles.label}>Color:</label>
                        <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="mileage" style={styles.label}>Mileage:</label>
                        <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="details" style={styles.label}>Details:</label>
                        <input type="text" id="details" name="details" value={formData.details} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="description" style={styles.label}>Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} style={styles.textarea}></textarea>
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="inStock" style={styles.label}>In Stock:</label>
                        <select id="inStock" name="inStock" value={formData.inStock} onChange={handleChange} style={styles.input}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="stockAmount" style={styles.label}>Stock Amount:</label>
                        <input type="number" id="stockAmount" name="stockAmount" value={formData.stockAmount} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="status" style={styles.label}>Status:</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} style={styles.input}>
                            <option value="new">New</option>
                            <option value="sold">Sold</option>
                            <option value="low-mileage">Low Mileage</option>
                            <option value="being-watched">Being Watched</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="price" style={styles.label}>Price:</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} style={styles.input} />
                    </div>
                    <button type="submit" style={styles.submitButton}>Add Vehicle</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
    },
    sidebar: {
        flex: '0 0 200px',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    sidebarButton: {
        display: 'block',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none',
        marginBottom: '10px',
    },
    mainContent: {
        flex: '1',
        padding: '20px',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default AddNewVehicle;
