import React from "react";
import { useState } from "react";
import "./App.css";
import backgroundImage from "../public/images/Background.png";
import { useEffect } from "react";

// - Display a list of volunteers based on search/filter criteria.
// - Nice extension options for this page: Render a search/filter form for staff to get a list of volunteers by date etc.

export default function ShowUsers() {
  const [volunteerList, setVolunteerList] = useState([]);

  useEffect(() => {
    ShowVolunteers();
  }, []);

  async function ShowVolunteers() {
    try {
      let response = await fetch("/api");
      if (response.ok) {
        let data = await response.json();
        setVolunteerList(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="users-table">
        <table>
          <caption>List of Volunteers</caption>
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {volunteerList.map((vol) => (
              <tr key="vol.id">
                <td>{vol.first_name}</td>
                <td>{vol.last_name}</td>
                <td>{vol.phone_number}</td>
                <td>{vol.email}</td>
                <button>Edit user</button>
                <button>Delete user</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
