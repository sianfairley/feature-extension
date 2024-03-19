import { useState } from "react";

export default function AdminViewEvents({ allEvents, setAllEvents }) {
  const [registeredVolunteers, setRegisteredVolunteers] = useState([]);

  // --- TOGGLE EVENT ----
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

  // Get user info for each event
  // async function ShowRegisteredVolunteers() {
  //   try {
  //     let response = await fetch("/api/admin/registeredvolunteers");
  //     if (response.ok) {
  //       let data = await response.json();
  //       setRegisteredVolunteers(data);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Network error: ${err.message}`);
  //   }
  // }

  return (
    <div className="background">
      <div className="admin-users-table">
        <table>
          <caption>Events</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">Volunteers registered</th>
              <th scope="col">Status</th>
              <th scope="col">Admin comments</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((thisEvent) => (
              <tr key={thisEvent.id}>
                <td>{thisEvent.date}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
