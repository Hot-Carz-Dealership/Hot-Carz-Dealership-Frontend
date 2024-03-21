import React from 'react';



const LogIn = () => {

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
        },
      };

  return (
    <div className="LogIn" style={styles.homepage}>
      <h1 style={styles.servicesDisplayTitle}>SIGN IN</h1>
      


      <form>
            <label for="username">Username:  </label><input type="text" id="username" name="username"/><br/>
            <label for="password">Password:  </label><input type="text" id="password" name="password"/><br/>
            <input type="submit" value="Submit" style={styles.bookApptButton}></input>
      </form>


    </div>
  );
};

export default LogIn;
