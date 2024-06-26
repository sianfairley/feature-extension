import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// --- MAIN PAGES ---
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import SignUpConfirmation from "./SignUpConfirmation";
import Error404 from "./Error.jsx";

// --- ADMIN COMPONENTS --- */
import AdminLogin from "./AdminLogin.jsx";
import AdminView from "./AdminView.jsx";
import ManageEvents from "./ManageEvents.jsx";
import EditUsers from "./EditUsers.jsx";
import AdminViewEvents from "./AdminViewEvents.jsx";
import ShowUsers from "./ShowUsers.jsx";

// --- USER COMPONENTS --- */
import UserView from "./UserView.jsx";
import UserViewEvents from "./UserViewEvents.jsx";
import UserContactDetails from "./UserDetails.jsx";
import UserRegisteredEvents from "./UserRegisteredEvents.jsx";

function App() {
  const [allEvents, setAllEvents] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpConfirmation" element={<SignUpConfirmation />} />
          {/* User components */}
          <Route path="/UserView" element={<UserView />}>
            <Route
              path="UserViewEvents"
              element={
                <UserViewEvents
                  allEvents={allEvents}
                  setAllEvents={setAllEvents}
                />
              }
            />
            <Route path="UserDetails" element={<UserContactDetails />} />
            <Route
              path="UserRegisteredEvents"
              element={<UserRegisteredEvents />}
            />
          </Route>

          <Route path="/AdminLogin" element={<AdminLogin />} />
          {/* Admin components */}
          <Route path="/AdminView" element={<AdminView />}>
            <Route path="ShowUsers" element={<ShowUsers />} />
            <Route path="EditUsers" element={<EditUsers />} />
            <Route path="ManageEvents" element={<ManageEvents />} />
            <Route
              path="AdminViewEvents"
              element={
                <AdminViewEvents
                  allEvents={allEvents}
                  setAllEvents={setAllEvents}
                />
              }
            />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
