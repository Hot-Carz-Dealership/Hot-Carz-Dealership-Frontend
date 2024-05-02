import React from "react";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";

import styles from "../css/editaccount.css";


const EditAccount = () => {
  
  

  const [/*loading,*/ setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${BASE_URL}/@me`);
        setUser(resp.data);
        setLoading(false);

      } catch (error) {
        console.log("Not Authenticated");
        setLoading(false);
        // Redirect to login page if user is not authenticated
        navigate("/login");
      }
    })();
  }, ); // Add navigate to the dependency array


  const handleSubmit = async () => {
    var x = document.getElementById("fname");
    var fName = x.value;

    x = document.getElementById("lname");
    var lName = x.value;

    x = document.getElementById("address");
    var address = x.value;

    x = document.getElementById("city");
    var city = x.value;

    x = document.getElementById("state");
    var state = x.value;

    x = document.getElementById("zipCode");
    var zip = x.value;

    x = document.getElementById("phnNumber");
    var phn = x.value;

    x = document.getElementById("emailAddress");
    var email = x.value;

    const data = {
      first_name: fName,
      last_name: lName,
      address: address,
      city: city,
      state: state,
      zipcode: zip,
      phone: phn,
      email: email
    }

    const requestData = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }
    const response = await fetch(`${BASE_URL}/api/members/update`, requestData);
    const responseData = await response.json()
     console.log(responseData);
    window.location.href = "/account";
  };

  return (
    <div className="account" style={styles.homepage}>
      <header className="flex justify-center items-center h-24 text-red-500 text-4xl font-bold leading-6 ">
        Edit Account Info{" "}
      </header>
      <form>
        <label for="fname">First Name: </label>
        <input type="text" id="fname" name="fname" defaultValue={user.first_name} />
        <br />
        <label for="lname">Last Name: </label>
        <input type="text" id="lname" name="lname" defaultValue={user.last_name} />
        <br />
        <label for="address">Address: </label>
        <input type="text" id="address" name="address" defaultValue={user.address}/>
        <br />
        <label for="city">City: </label>
        <input type="text" id="city" name="city" defaultValue={user.city}/>
        <br />
        <label for="state">State: </label>
        <input type="text" id="state" name="state" defaultValue={user.state}/>
        <br />
        <label for="zipCode">Zip Code: </label>
        <input type="text" id="zipCode" name="zipCode" defaultValue={user.zipcode}/>
        <br />
        <label for="phnNumber">Phone Number: </label>
        <input type="text" id="phnNumber" name="phnNumber" defaultValue={user.phone}/>
        <br />
        <label for="emailAddress">Email Address: </label>
        <input type="text" id="emailAddress" name="emailAddress" defaultValue={user.email}/>
        <br />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={styles.bookApptButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditAccount;
