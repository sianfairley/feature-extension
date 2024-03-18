export default function AdminViewEvents({ allEvents, setAllEvents }) {
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

  return (
    <div className="background">
      <div className="users-table">
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
