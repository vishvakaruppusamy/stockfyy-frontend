import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./dasboard/Dashboard";
import Footerr from "./components/Footerr";
import Chatbot from "./components/Chartbot";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access"));

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">

        {/* Header */}
        <Header token={token} setToken={setToken} />

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Login */}
            <Route
              path="/login"
              element={
                token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />
              }
            />

            {/* Signup */}
            <Route
              path="/signup"
              element={
                token ? <Navigate to="/dashboard" /> : <Signup />
              }
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<Dashboard token={token} setToken={setToken} />}
            />

            {/* Unknown Route */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>

        {/* Chatbot */}
        <Chatbot />

        {/* Footer */}
        <Footerr />

      </div>
    </Router>
  );
}

export default App;
