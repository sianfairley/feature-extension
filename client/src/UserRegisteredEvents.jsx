import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegisteredEvents() {
  const [usersEvents, setUsersEvents] = useState([]);
  const [userID, setUserID] = useState("");
  const [eventDates, setEventDates] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    requestUserData();
  }, []);

  useEffect(() => {
    if (userID) {
      getUsersEvents(userID);
    }
  }, [userID]);

  async function getUsersEvents(userID) {
    try {
      let response = await fetch(`/api/users/usersevents/${userID}`);
      if (response.ok) {
        let result = await response.json();

        //   Convert date format
        const newData = result.data.map((item) => {
          const jsDate = new Date(item.date);
          const stringDate = jsDate.toDateString();
          return {
            ...item,
            date: stringDate,
          };
        });

        setUsersEvents(newData);
        console.log("User events:", result.data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div className="background">
      <div className="user-events-table">
        <table>
          <caption>My Events</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
            </tr>
          </thead>
          <tbody>
            {usersEvents.map((thisEvent) => (
              <tr key={thisEvent.id}>
                <td>{thisEvent.date}</td>
                <td>{thisEvent.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
