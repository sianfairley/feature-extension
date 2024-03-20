import backgroundImage from "/images/Background.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserViewEvents() {
  const [allActiveEvents, setAllActiveEvents] = useState([]);
  const [attendingEvent, setAttendingEvent] = useState(false);
  const [userID, setUserID] = useState("");

  const navigate = useNavigate();

  // Get all active events
  useEffect(() => {
    showActiveEvents();
  }, []);

  const showActiveEvents = () => {
    fetch("/api/users/activeevents")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllActiveEvents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get user's id to pass to signup function
  useEffect(() => {
    showActiveEvents();

    requestUserData();
  }, []);

  //GET USER DATA
  const requestUserData = async () => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/Home");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let results = await fetch("/api/users/userdata", options);
      if (results.ok) {
        let data = await results.json();
        console.log(data);
        setUserID(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Sign up to event - get logged in user's id
  const signupEvent = async (eventID) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventID: eventID,
        userID: userID,
      }),
    };
    try {
      let response = await fetch(`/api/users/eventsignup`, options);
      if (response.ok) {
        let data = await response.json();
        setAttendingEvent(true);
        console.log(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="users-table">
        <table>
          <caption>Events</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">Volunteers registered</th>
              <th scope="col">Sign up</th>
            </tr>
          </thead>
          <tbody>
            {allActiveEvents.map((thisEvent) => (
              <tr key={thisEvent.id}>
                <td>{thisEvent.date}</td>
                <td>{thisEvent.shift}</td>
                <td>{thisEvent.volunteers_registered.toString()}</td>
                <td
                  style={attendingEvent ? { backgroundColor: "green" } : null}
                >
                  {attendingEvent ? (
                    <p>Attending</p>
                  ) : (
                    <button onClick={() => signupEvent(thisEvent.id)}>
                      Sign me up!
                    </button>
                  )}
                </td>
                <td>{thisEvent.admin_comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
