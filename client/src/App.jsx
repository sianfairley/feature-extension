import { useState } from "react";
import "./App.css";
import HomePage from "./UserHomePage.jsx";
import VolunteerView from "./VolunteerView";
import StaffView from "./StaffView";
import SignUpConfirmation from "./SignUpConfirmation";
import Error404 from "./Error.jsx";

import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* all routes will go inside routes tags here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/VolunteerView" element={<VolunteerView />} />
        <Route path="/StaffView" element={<StaffView />} />
        <Route path="/SignUpConfirmation" element={<SignUpConfirmation />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
