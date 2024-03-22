import { useState, useEffect } from "react";

export default function AdminViewEvents({ allEvents, setAllEvents }) {
  const [eventVolunteers, setEventVolunteers] = useState([]);
  const [showThisEventVolunteers, setShowThisEventVolunteers] = useState(false);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    fetch("/api/admin/allevents")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((item) => {
          const jsDate = new Date(item.date);
          const stringDate = jsDate.toDateString();
          return {
            ...item,
            date: stringDate,
          };
        });
        console.log(data.date);
        setAllEvents(newData);
        setEventDates(newData.map((event) => event.date));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // --- TOGGLE EVENT COMPLETION----
  const toggleComplete = (id) => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/api/admin/setcomplete/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllEvents(data);
      })
      .catch((error) => console.log(error));
  };

  //Scroll to volunteers list
  const scrolltoVolunteers = () => {
    const volunteersSection = document.getElementById("view-event-volunteers");
    volunteersSection.scrollIntoView({ behavior: "smooth" });
  };

  // Get user info for selected event
  async function ShowEventVolunteers(eventID) {
    try {
      let response = await fetch(`/api/admin/eventvolunteers/${eventID}`);
      if (response.ok) {
        let result = await response.json();
        setEventVolunteers(result.data);
        console.log("Volunteers:", result.data);
        setShowThisEventVolunteers(true);
        scrolltoVolunteers();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div className="background">
      <div className="admin-users-table">
        <table>
          <caption>Events</caption>
          <thead>
            <tr>
              <th scope="col">Event ID</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">No. Volunteers registered</th>
              <th scope="col">Status</th>
              <th scope="col">Admin Comments</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((thisEvent, index) => (
              <tr key={thisEvent.id}>
                <td>{thisEvent.id}</td>
                <td>{eventDates[index]}</td>
                <td>{thisEvent.shift}</td>
                <td>{thisEvent.volunteers_registered}</td>

                <td>
                  {thisEvent.is_active ? "Active" : "Finished"}
                  <button onClick={() => toggleComplete(thisEvent.id)}>
                    {thisEvent.is_active
                      ? "Mark as finished"
                      : "Mark as active"}
                  </button>
                </td>
                <td>{thisEvent.admin_comment}</td>
                <td>
                  <button onClick={() => ShowEventVolunteers(thisEvent.id)}>
                    See volunteers
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="view-event-volunteers" id="view-event-volunteers">
        {showThisEventVolunteers ? (
          <div>
            <h3>Volunteers</h3>

            <div>
              {eventVolunteers.map((volunteer) => (
                <div key={volunteer.id}>
                  <ul>
                    <li>
                      <p>
                        {volunteer.first_name} {volunteer.last_name}
                      </p>
                      <p>{volunteer.email}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={() => setShowThisEventVolunteers(false)}>
              Close
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
