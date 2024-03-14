import React from "react";
import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../public/images/Background.png";
import Navbar from "./Navbar";

// - Display a sign up form for volunteers.
// - Render drop down options in the sign up form for date, time and items.
// - Nice extension options for this page: Make the date drop down options dynamic and change automatically based on the current date, remove items from the options on the list of items to donate as they are signed up for. Add options to cancel/change the sign up form after submitted.

export default function SignUp(props) {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // sets input to format database is expecting
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    };
    try {
      // this will run POST on /todos b/c of input from options?
      let response = await fetch("/api/signup", options);
      if (response.ok) {
        // data = response.data from POST api function? i.e. full updated list
        let data = await response.json();
        console.log(data);
        navigate("/SignUpConfirmation");
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }

    // setSignUpData({
    //   first_name: "",
    //   last_name: "",
    //   email: "",
    //   phone_number: "",
    //   password: "",
    // });
  }

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="sign-up">
        <Navbar />
        <h2>
          Thanks for choosing to sign up! Please enter your details below:
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            First name
            <input
              name="first_name"
              value={signUpData.first_name}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Last name
            <input
              name="last_name"
              value={signUpData.last_name}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              value={signUpData.email}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Phone number
            <input
              name="phone_number"
              value={signUpData.phone_number}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={signUpData.password}
              onChange={(e) => handleInputChange(e)}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
