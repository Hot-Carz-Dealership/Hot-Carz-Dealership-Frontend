import React from 'react';
import placeholderImage from '../imgs/placeholder.png';
import engineImage from '../imgs/engine.png';
import oilChangeImage from '../imgs/oilChange.png';
import tiresImage from '../imgs/tires.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const services = () => {
  const styles = {
    homepage: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    welcome: {
      fontSize: '2em',
      color: 'black',
      fontWeight: 'bold',
    },
    carDisplay: {
      marginTop: '20px',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '5px',
    },
    carDisplayTitle: {
      fontSize: '1.5em',
      color: 'red',
    },

    featuredCarList: {
      listStyle: 'none', 
      padding: 0, 
      display: 'flex', 
      justifyContent: 'space-between', 
    },
    featuredCarItem: {
      textAlign: 'center', 
      flex: '1', 
    },

    featuredCarImage: {
      height: '300px',
      width: '300px',
      margin: '0 auto',
    },

    searchButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '5px 10px',
    },

    servicesItem: {
      marginLeft: '2%',
      marginRight: '2%',
      width: '30%', 
      textAlign: 'center', 
      display: 'inline-block',
      marginBottom: '20px', 
    },
    serviceImage: {
      height: '200px',
      width: '300px',
      margin: '0 auto',

    },
    servicesDisplayTitle: {
      color: 'red',
      textAlign: 'center',
      fontSize: '1.5em',
    },
    price: {
      color: 'red',

    },
    bookApptButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '5px 10px',
      marginTop: '10px', // Add margin to separate from other content
    },
  };


  return (
    <div className="homepage" style={styles.homepage}>
      <div className='servicesDisplay' style={styles.carDisplay}>
        <h1 className='servicesDisplayTitle' style={styles.servicesDisplayTitle}>OUR SERVICES</h1>
        <ul className='servicesList' style={styles.featuredCarList}>

          {/* Oil Change Service */}
          <li style={styles.servicesItem}>
            <img src={oilChangeImage} style={styles.serviceImage} alt="Vehicle" />
            <h1 className='oilChangePrice' style={styles.price}>$40</h1>
            <h2>Oil Change Service</h2>
            <p>Oil is the lifeblood of your car's engine. A high mileage synthetic blend service and fully synthetic oil change service with 120 PT. inspection included free.</p>
            <button className='bookApptButton' style={styles.bookApptButton}>Book Appt.</button>
          </li>
          
          {/* Engine Tune Up */}
          <li style={styles.servicesItem}>
            <img src={engineImage} style={styles.serviceImage} alt="Vehicle" />
            <h1 className='enginePrice' style={styles.price}>$120</h1>
            <h2>Engine Tune Up</h2>
            <p>Get complete and comprehensive engine diagnostics and system evaluations for you vehicle. While Keeping your car running like new.</p>
            <button className='bookApptButton' style={styles.bookApptButton}>Book Appt.</button>
          </li>
          
          {/* Tire Services */}
          <li style={styles.servicesItem}>
            <img src={tiresImage} style={styles.serviceImage} alt="Vehicle" />
            <h1 className='tiresPrice' style={styles.price}>$100</h1>
            <h2>Tire Services</h2>
            <p>We offer tire repair, alignments, tire balancing and tire rotation to help keep your tires healthy.</p>
            <button className='bookApptButton' style={styles.bookApptButton}>Book Appt.</button>
          </li>
        </ul>   
        <button className='viewAppointments' style={styles.searchButton}><Link to="/account" className="button">VIEW CAR STATUS</Link></button>     
      </div>
    </div>
  );
};

export default services;
