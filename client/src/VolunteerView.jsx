import React from "react";
import "./App.css";
import { useState } from "react";
import UserHomePage from "./UserHomePage";
import backgroundImage from "../public/images/Background.png";
import Navbar from "./Navbar";

// - Display a sign up form for volunteers.
// - Render drop down options in the sign up form for date, time and items.
// - Nice extension options for this page: Make the date drop down options dynamic and change automatically based on the current date, remove items from the options on the list of items to donate as they are signed up for. Add options to cancel/change the sign up form after submitted.

export default function VolunteerView(props) {
  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    sign_up_date: "",
    shift_time: "",
    items_to_donate: "",
  });

  const [availableItems, setAvailableItems] = useState([
    "30 tuna sandwiches",
    "30 cheese sandwiches",
    "30 boiled eggs",
    "30 muffins",
    "30 pieces of soft fruit",
  ]);

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
      let response = await fetch("/api", options);
      if (response.ok) {
        // data = response.data from POST api function? i.e. full updated list
        let data = await response.json();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }

    setSignUpData({
      first_name: "",
      last_name: "",
      phone_number: "",
      sign_up_date: "",
      shift_time: "",
      items_to_donate: "",
    });
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
            Phone number
            <input
              name="phone_number"
              value={signUpData.phone_number}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Sign up date
            <select
              name="sign_up_date"
              value={signUpData.sign_up_date}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="2024-03-09">Saturday, March 9th</option>
              <option value="2024-03-10">Sunday, March 10th</option>
              <option value="2024-03-16">Saturday, March 16th</option>
              <option value="2024-03-17">Sunday, March 17th</option>
            </select>
          </label>

          <label>
            Shift time
            <select
              name="shift_time"
              value={signUpData.shift_time}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="13:00:00">Afternoon (1-3pm)</option>
              <option value="19:00:00">Evening (7-9pm)</option>
            </select>
          </label>
          <label>
            Items to donate
            <select
              name="items_to_donate"
              value={signUpData.items_to_donate}
              onChange={(e) => handleInputChange(e)}
            >
              {availableItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
