import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "/images/Background.png";

export default function ManageEvents() {
  // const navigate = useNavigate();

  // CREATE NEW EVENT
  const [activityData, setActivityData] = useState({
    date: "",
    shift: "",
    volunteers_registered: 0,
    is_active: 1,
    admin_comment: "",
  });

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    const name = event.target.name;
    setActivityData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(activityData);
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
      let response = await fetch("/api/admin/addevent", options);
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

            <legend>
              Shift
              <div>
                <label htmlFor="shift1">1-3</label>

                <input
                  type="radio"
                  name="shift"
                  value="1-3"
                  checked={activityData.shift === "1-3"}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <label htmlFor="shift2">later</label>
              <input
                type="radio"
                name="shift"
                value="later"
                checked={activityData.shift === "later"}
                onChange={(e) => handleInputChange(e)}
              />
            </legend>

            <label>
              Add any additional information for volunteers
              <input
                type="text"
                name="admin_comment"
                value={activityData.admin_comment}
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
