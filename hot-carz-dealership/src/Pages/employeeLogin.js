import React from 'react';
import httpClient from "../httpClient";
import { useState } from 'react';


const EmployeeLogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const logInEmployee = async () => {

    const resp = await httpClient.post("//localhost:5000/api/employees/login", {
      "email": email,
      "password": password,
    });

    if(resp.status == 200){
      window.location.href = "/managerPage"
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
            <label for="username">Email:  </label><input type="text" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
            <label for="password">Password:  </label><input type="text" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br/>
            <button onClick={() => logInEmployee()} type="button" value="Submit" style={styles.bookApptButton}>Submit</button>
      </form>


    </div>
  );
};

export default EmployeeLogIn;
