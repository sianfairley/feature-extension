import React from "react";
import "./App.css";
import Login from "./Login";
import backgroundImage from "../public/images/Background.png";

export default function SignUpConfirmation() {
  return (
    <div
      className="background sign-up-confirmation"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <p>
        Thank you for signing up - now you can login and register for your first
        project!
      </p>
      <Login />
    </div>
  );
}

// On confirmation, button to send user to login
