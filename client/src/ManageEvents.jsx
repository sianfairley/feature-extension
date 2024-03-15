import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageEvents() {
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    date:
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setActivityData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // sets input to format database is expecting
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    };
    try {
      // this will run POST on /todos b/c of input from options?
      let response = await fetch("/api/admin/createevent", options);
      if (response.ok) {
        // data = response.data from POST api function? i.e. full updated list
        let data = await response.json();
        console.log(data);
        // navigate("/ViewEvents");
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
      <Navbar />
      <div className="sign-up">
        <div className="sign-up-form">
          <h2>Add a new event</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={activityData.date}
                onChange={(e) => handleInputChange(e)}
              />
            </label>
            <label>
              Add any additional information for volunteers
              <input
                name="last_name"
                value={activityData.comments}
                onChange={(e) => handleInputChange(e)}
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
