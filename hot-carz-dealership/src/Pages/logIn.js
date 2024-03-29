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
        
        servicesDisplayTitle: {
          color: 'red',
          fontSize: '3em',
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
