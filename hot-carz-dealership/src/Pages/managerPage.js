import React, { useState } from 'react';
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; 

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
  };
const ManagerPage = () => {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    const [modal5Open, setModal5Open] = useState(false);
    const [modal6Open, setModal6Open] = useState(false);

    const openModal = (modalNumber) => {
        setModal1Open(false);
        setModal2Open(false);
        setModal3Open(false);
        setModal4Open(false);
        setModal5Open(false);
        setModal6Open(false); 
    
        switch (modalNumber) {
            case 1:
                setModal1Open(true);
                break;
            case 2:
                setModal2Open(true);
                break;
            case 3:
                setModal3Open(true);
                break;
            case 4:
                setModal4Open(true);
                break;
            case 5:
                setModal5Open(true);
                break;
            case 6:
                setModal6Open(true);
                break;
            default:
                break;
        }
    };
    


    return (
        <div style={styles.container}>
        <div style={styles.buttonsContainer}>
                {/* Button to open Modal 1 */}
                <button style={styles.modalButton} onClick={() => openModal(1)}>Appointments</button>
                {/* Button to open Modal 2 */}
                <button style={styles.modalButton} onClick={() => openModal(2)}>Bids</button>
                {/* Button to open Modal 3 */}
                <button style={styles.modalButton} onClick={() => openModal(3)}>Test Drives</button>
                {/* Button to open Modal 4 */}
                <button style={styles.modalButton} onClick={() => openModal(4)}>Customers</button>
                {/* Button to open Modal 5 */}
                <button style={styles.modalButton} onClick={() => openModal(5)}>Vehicle Listings</button>
                {/* Button to open Modal 6 */}
                <button style={styles.modalButton} onClick={() => openModal(6)}>Sales Report</button>
            </div>

            <div style={styles.modalContainer}>

            <Modal isOpen={modal1Open} toggle={() => setModal1Open(!modal1Open)}>
                <h2>Appointments</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Customer Phone</th>
                            <th>Status</th>
                            <th>Vehicle</th>
                            <th>DateTime</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Populate table with appointment data */}
                    </tbody>
                </table>      </Modal>
            <Modal isOpen={modal2Open} toggle={() => setModal2Open(!modal2Open)}>
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
                </table>      </Modal>
            <Modal isOpen={modal3Open} toggle={() => setModal3Open(!modal3Open)}>
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
                </table>      </Modal>
                <Modal isOpen={modal4Open} toggle={() => setModal4Open(!modal4Open)}>

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
                </table>      </Modal>
                <Modal isOpen={modal5Open} toggle={() => setModal5Open(!modal5Open)}>
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
                </Modal>
                <Modal isOpen={modal6Open} toggle={() => setModal6Open(!modal6Open)}>
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
                </Modal>
        </div>
        </div>
    );
};

export default ManagerPage;
