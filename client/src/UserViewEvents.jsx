import backgroundImage from "/images/Background.png";
import { useState, useEffect } from "react";

export default function UserViewEvents() {
  const [allActiveEvents, setAllActiveEvents] = useState([]);
  const [attendingEvent, setAttendingEvent] = useState(false);

  // Get all active events
  useEffect(() => {
    fetch("/api/users/activeevents")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllActiveEvents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Sign up to event - get logged in user's id
  async function signupEvent(id) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await fetch(`/api/users/eventsignup/${id}`, options);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
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
                <td>
                  <button onClick={() => signupEvent(thisEvent.id)}>
                    Sign me up!
                  </button>
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
