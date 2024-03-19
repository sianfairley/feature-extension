import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import StaffView from "./StaffView";
import SignUpConfirmation from "./SignUpConfirmation";
import Error404 from "./Error.jsx";

// --- ADMIN COMPONENTS --- */
import AdminLogin from "./AdminLogin.jsx";
import ManageEvents from "./ManageEvents.jsx";
import EditUsers from "./EditUsers.jsx";
import AdminViewEvents from "./AdminViewEvents.jsx";
import ShowUsers from "./ShowUsers.jsx";

// --- USER COMPONENTS --- */
import UserView from "./UserView.jsx";
import UserViewEvents from "./UserViewEvents.jsx";

function App() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetch("/api/admin/allevents")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllEvents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Routes>
          {/* all routes will go inside routes tags here */}
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpConfirmation" element={<SignUpConfirmation />} />
          {/* Private route to user views */}
          <Route path="/UserView" element={<UserView />} />
          {/* <PrivateRoute></PrivateRoute> */}
          {/* Private route to staff views */}

          <Route path="/StaffView" element={<StaffView />} />
          <Route path="ShowUsers" element={<ShowUsers />} />
          <Route path="EditUsers" element={<EditUsers />} />
          <Route path="ManageEvents" element={<ManageEvents />} />
          <Route
            path="/AdminViewEvents"
            element={
              <AdminViewEvents
                allEvents={allEvents}
                setAllEvents={setAllEvents}
              />
            }
          />

          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route
            path="/UserViewEvents"
            element={
              <UserViewEvents
                allEvents={allEvents}
                setAllEvents={setAllEvents}
              />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
