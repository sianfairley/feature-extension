import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "/images/Background.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [LoginData, SetLoginData] = useState({
    email: "",
    password: "",
  });

  //Get login form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetLoginData({ ...LoginData, [name]: value });
  };

  //Submit form and login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      //Send credentials to server
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData),
      };

      let results = await fetch("api/admin/login", options);
      let data = await results.json();

      //If results ok, save the token from the server in local storage
      if (results.ok) {
        console.log(data);
        localStorage.setItem("token", data.token);

        // navigate("/UserView");
        navigate("/StaffView");
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="admin-login">
        <h3>Admin Login</h3>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              name="email"
              value={LoginData.email}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={LoginData.password}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
