import React from 'react';
import httpClient from "../httpClient";
import { useState } from 'react';
import Homepage from "./homepage";

const LogIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const logInUser = async () => {

    const resp = await httpClient.post("//localhost:5000/api/members/login", {
      "username": username,
      "password": password,
    });

    if(resp.status == 200){
      window.location.href = "/"
    }

  }


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
            <label for="username">Username:  </label><input type="text" id="email" name="email" value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
            <label for="password">Password:  </label><input type="text" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br/>
            <button onClick={() => logInUser()} type="button" value="Submit" style={styles.bookApptButton}>Submit</button>
      </form>


    </div>
  );
};

export default LogIn;
