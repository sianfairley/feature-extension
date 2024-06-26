import Navbar from "./Navbar";
import { Link, useNavigate, Outlet } from "react-router-dom";
import backgroundImage from "/images/Background.png";
import { useState, useEffect } from "react";

export default function UserView() {
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    requestUserData();
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
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <Link to="/UserView/UserViewEvents">
        <button>View upcoming events</button>
      </Link>
      <Link to="/UserView/UserRegisteredEvents">
        <button>See my events</button>
      </Link>

      <div className="welcome-message">
        <p>Welcome {userData.first_name}</p>
        <ul>
          <li>{userData.phone_number}</li>
          <li>{userData.email}</li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
