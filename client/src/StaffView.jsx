import React from "react";
import { useState } from "react";
import "./App.css";
import ShowUsers from "./ShowUsers";
import Navbar from "./Navbar";
import backgroundImage from "../public/images/Background.png";
import { Link } from "react-router-dom";

// - Display a list of volunteers based on search/filter criteria.
// - Nice extension options for this page: Render a search/filter form for staff to get a list of volunteers by date etc.

export default function StaffView() {
  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Navbar />
        <Link to={"ShowUsers"}>
          <button>View volunteers</button>
        </Link>
        <ShowUsers />
        <Link to={"Projects"}>
          <button>See Projects</button>
        </Link>
      </div>
    </>
  );
}
