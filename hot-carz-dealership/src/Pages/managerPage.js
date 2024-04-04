import React, { useState,useEffect } from 'react';
import Modal from './Modal';
import httpClient from "../httpClient";
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';


const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    buttonsContainer: {
      marginRight: '20px',
      backgroundColor: 'black',
      color: 'white',
      padding: '10px',
      height: '100vh',
      overflowY: 'auto',
    },
    modalContainer: {
      flex: 1,
    },
    modalButton: {
      display: 'block',
      marginBottom: '10px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      padding: '10px',
    },
    tableContainer: {
        flex: 1, 
        width: '100%', 
      },
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      border: '2px solid black',
    },
    th: {
      border: '2px solid black',
      padding: '8px',
      textAlign: 'left',
    },
    td: {
      border: '2px solid black',
      padding: '8px',
      textAlign: 'left',
    },

    creationButton: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '20px',
        border: 'none',
        textDecoration: 'none', 
        cursor: 'pointer',
        margin: '10px 0',
    }
  };
  const ManagerPage = () => {
/* FOR WHEN WE START TESTING WITH BACKEND
    const requestData = async (type) => {
        try {
            const response = await fetch(`api/${type}`);
            console.log('Response received:', response); // Log the response object
            const data = await response.json();
            console.log('Data fetched successfully:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
*/
const [user, setUser] = useState(null);

useEffect(()=> {
    (async() => {
      try{
        const resp = await httpClient.get("//localhost:5000/@emp");
        setUser(resp.data);
      } catch (error){
        console.log("Not Authenticated")
      }

    })();
  }, []);    



    const [selectedTab, setSelectedTab] = useState(null);


    const renderTable = () => {
        switch (selectedTab) {
          case 2:
            return (

          <div style={styles.tableContainer}>
                <h2>Bids</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Make</th>
                      <th>Model</th>
                      <th>VIN</th>
                      <th>MSRP</th>
                      <th>Bid Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Populate table with bid data */}
                  </tbody>
                </table>
              </div>
            );
          case 3:
            return (
              <div style={styles.tableContainer}>
                <h2>Test Drives</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Customer Phone</th>
                      <th>Status</th>
                      <th>Vehicle</th>
                      <th>Datetime</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Populate table with test drive appointment data */}
                  </tbody>
                </table>
              </div>
            );
          case 4:
            return (
              <div style={styles.tableContainer}>
                <h2>Customers</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone #</th>
                      <th>Email</th>
                      <th>Zipcode</th>
                      <th>License #</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Populate table with customer data */}
                  </tbody>
                </table>
              </div>
            );
          case 5:
            return (
              <div style={styles.tableContainer}>
                <h2>Vehicle Listings</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Year</th>
                      <th>VIN</th>
                      <th>Bids (Amount)</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Populate table with vehicle listings data */}
                  </tbody>
                </table>
              </div>
            );
          case 6:
            return (
              <div style={styles.tableContainer}>
                <h2>Sales Report</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>New Balance</th>
                      <th>Date Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Populate table with sales report data */}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      };
    

    return (
        <div style={styles.container}>
          <div style={styles.buttonsContainer}>
            <button style={styles.modalButton} onClick={() => setSelectedTab(2)}>Bids</button>
            <button style={styles.modalButton} onClick={() => setSelectedTab(3)}>Test Drives</button>
            <button style={styles.modalButton} onClick={() => setSelectedTab(4)}>Customers</button>
            <button style={styles.modalButton} onClick={() => setSelectedTab(5)}>Vehicle Listings</button>
            <button style={styles.modalButton} onClick={() => setSelectedTab(6)}>Sales Report</button>
            <Link to="/create-employee-account" style={styles.creationButton}>Create Employee Acct.</Link>
        <br></br>
        <Link to="/add-new-vehicle" style={styles.creationButton}>Add new Vehicle</Link>
          </div>



    
          {renderTable()}
        </div>
      );
    
};

export default ManagerPage;