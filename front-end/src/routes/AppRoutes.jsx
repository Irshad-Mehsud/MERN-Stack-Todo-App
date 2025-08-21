import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App.jsx";
import Signup from "../components/Auth/Signup.jsx";
import Login from "../components/Auth/Login.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/dashboard" element={<App />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
