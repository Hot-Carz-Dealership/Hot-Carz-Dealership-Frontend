import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { BASE_URL } from "../utilities/constants";

const CreateEmployeeAccount = () => {
    


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        employeeType: 'manager' // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (
            formData.firstname === '' ||
            formData.lastname === '' ||
            formData.email === '' ||
            formData.phone === '' ||
            formData.address === ''
        ) {
            window.alert('Please fill in all fields.');
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/api/employees/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to create employee account');
            }
    
            const data = await response.json();
            console.log("Employee account created successfully:", data);
    
            window.alert("Employee account created successfully!");
    
        } catch (error) {
            console.error("Error creating employee account:", error);
            window.alert("Something went wrong. Please try again.");
        }
    };
    
    

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <Link to="/managerPage" style={styles.sidebarButton}>Return to Manager Page</Link>
            </div>
            <div style={styles.mainContent}>
                <h2 style={styles.heading}>Create Employee Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="firstname" style={styles.label}>First Name:</label>
                        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="lastname" style={styles.label}>Last Name:</label>
                        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="phone" style={styles.label}>Phone:</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="address" style={styles.label}>Address:</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="employeeType" style={styles.label}>Employee Type:</label>
                        <select id="employeeType" name="employeeType" value={formData.employeeType} onChange={handleChange} style={styles.input}>
                            <option value="superAdmin">Super Admin</option>
                            <option value="manager">Manager</option>
                            <option value="technician">Technician</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.submitButton}>Create Employee</button>
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
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxSizing: 'border-box',
    },
    submitButton: {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default CreateEmployeeAccount;
