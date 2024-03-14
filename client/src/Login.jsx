import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserView from "./UserView";

export default function Login() {
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
      let response = await fetch("api/login", options);

      //If results ok, redirect to userhome
      if (response.ok) {
        navigate("/UserView");
        console.log("ok");
      } else {
        let errorMessage = await response.text();
        console.log("login failed:", errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <h3>Login</h3>
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
  );
}
