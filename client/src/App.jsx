import { useState } from "react";
import "./App.css";
import PublicHomePage from "./PublicHome.jsx";
import SignUp from "./SignUp.jsx";
import StaffView from "./StaffView";
import SignUpConfirmation from "./SignUpConfirmation";
import Error404 from "./Error.jsx";

import { Routes, Route } from "react-router-dom";
import UserView from "./UserView.jsx";
import ShowUsers from "./ShowUsers.jsx";
import AdminLogin from "./AdminLogin.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* all routes will go inside routes tags here */}
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUpConfirmation" element={<SignUpConfirmation />} />
        {/* Private route to user views */}
        <Route path="/UserView" element={<UserView />} />
        {/* <PrivateRoute></PrivateRoute> */}
        {/* Private route to staff views */}

        <Route path="/StaffView" element={<StaffView />}>
          <Route path="ShowUsers" element={<ShowUsers />} />
        </Route>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
