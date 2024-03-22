import { useState } from "react";
import "./App.css";
import backgroundImage from "/images/Background.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// - Display a list of volunteers based on search/filter criteria.
// - Nice extension options for this page: Render a search/filter form for staff to get a list of volunteers by date etc.

export default function ShowUsers() {
  const [volunteerList, setVolunteerList] = useState([]);

  useEffect(() => {
    ShowVolunteers();
  }, []);

  const toggleRole = (userId) => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    };

    fetch(`/api/admin/setRole/${userId}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        ShowVolunteers();
      })
      .catch((error) => console.log(error));
  };

  async function ShowVolunteers() {
    try {
      let response = await fetch("/api/admin");
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
      className="background "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="admin-users-table">
        <table>
          <caption>Volunteer Information</caption>
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {volunteerList.map((vol) => (
              <tr key={vol.id}>
                <td>{vol.first_name}</td>
                <td>{vol.last_name}</td>
                <td>{vol.phone_number}</td>
                <td>{vol.email}</td>
                <td>{vol.isAdmin ? "Admin" : "Volunteer"}</td>
                <button onClick={() => toggleRole(vol.id)}>
                  {vol.isAdmin ? "Make volunteer" : "Make admin"}
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
