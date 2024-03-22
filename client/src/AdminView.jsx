import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import backgroundImage from "/images/Background.png";
import { Link, Outlet } from "react-router-dom";

// - Display a list of volunteers based on search/filter criteria.
// - Nice extension options for this page: Render a search/filter form for staff to get a list of volunteers by date etc.

export default function AdminView() {
  //Function to scroll to volunteers section

  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="header">
          <Navbar />
          <div className="admin-welcome-message">
            <p>Welcome</p>
          </div>
        </div>
        <div className="admin-tabs">
          <Link to={"/AdminView/AdminViewEvents"}>
            <button>View events</button>
          </Link>
          <Link to="/AdminView/ShowUsers">
            <button>Show Volunteers</button>
          </Link>
          <Link to="/AdminView/ManageEvents">
            <button>Add event</button>
          </Link>
        </div>

        <Outlet />
      </div>
    </>
  );
}
