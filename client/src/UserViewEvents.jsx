import backgroundImage from "/images/Background.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserViewEvents() {
  const [allActiveEvents, setAllActiveEvents] = useState([]);
  const [userID, setUserID] = useState("");
  const [usersEvents, setUsersEvents] = useState([]);

  const navigate = useNavigate();

  // Get all active events
  useEffect(() => {
    showActiveEvents();
  }, []);

  const showActiveEvents = () => {
    fetch("/api/users/activeevents")
      .then((res) => res.json())
      .then((data) => {
        //Change mysql date to string via JS date
        const newData = data.map((item) => {
          const jsDate = new Date(item.date);
          const stringDate = jsDate.toDateString();
          return {
            ...item,
            date: stringDate,
          };
        });
        console.log(data.date);
        setAllActiveEvents(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get user's id to pass to signup function
  useEffect(() => {
    showActiveEvents();
    requestUserData();
    const storedUserEvents = JSON.parse(localStorage.getItem("userEvents"));
    if (storedUserEvents) {
      setUsersEvents(storedUserEvents);
    } else {
      getUsersEvents(userID);
    }
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

  //Get user's info from the event_volunteers table. Check whether they are signed up to any.
  async function getUsersEvents(userID) {
    try {
      let response = await fetch(`/api/users/usersevents/${userID}`);
      if (response.ok) {
        let result = await response.json();
        setUsersEvents(result.data);
        localStorage.setItem("usersEvents", JSON.stringify(result.data));
        console.log("User events:", result.data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  // Sign up to event using selected event's id and user id
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
      let response = await fetch(`/api/users/eventsignup/`, options);
      if (response.ok) {
        let data = await response.json();
        showActiveEvents();
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
      <div className="user-events-table">
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
                  {usersEvents.find((event) => event.id === thisEvent.id) ? (
                    <p>Attending event</p>
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
