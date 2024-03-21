import React from 'react';

const Account = () => {

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
      fontSize: '3em',
    },
    price: {
      color: 'red',

    },
    bookApptButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '5px 10px',
      marginTop: '10px', // Add margin to separate from other content
      marginLeft: '10px',
      justifyContent: 'center', 
    },
    listAlign: {
      justifyContent: 'left', 
    },
  };


  

  return (
    <div className="account" style={styles.homepage}>
      <h1 style={styles.servicesDisplayTitle}>ACCOUNT INFO</h1>
      <ul>
        <li style={styles.listAlign}>Name: </li>
        <li style={styles.listAlign}>Address: </li>
        <li style={styles.listAlign}>Phone Number: </li>
        <li style={styles.listAlign}>Email Address: </li>
        <li style={styles.listAlign}>Drivers License Number: </li>
      </ul>
      <button className='bookApptButton' style={styles.bookApptButton}>Edit Info</button>
      <button className='bookApptButton' style={styles.bookApptButton}>Log Out</button>
      <p>Modals for Test Drives and Tracker down below</p>

            <form>
                <label for="name">Name:  </label><input type="text" id="name" name="name"/><br/>
                <label for="address">Address:  </label><input type="text" id="address" name="address"/><br/>
                <label for="phnNumber">Address:  </label><input type="text" id="phnNumber" name="phnNumber"/><br/>
                <label for="emailAddress">Email Address:  </label><input type="text" id="emailAddress" name="name"/><br/>
                <label for="license">Drivers License Number:  </label><input type="text" id="license" name="license"/><br/>
                <input type="submit" value="Submit" style={styles.bookApptButton}></input>
            </form>


    </div>
  );
};

export default Account;
