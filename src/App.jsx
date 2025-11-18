import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Corrected and streamlined imports
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./dasboard/Dashboard";
import Footerr from "./components/Footerr"; // Ensure this matches your filename
import Chatbot from "./components/Chartbot";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access") || null);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header token={token} setToken={setToken} />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Chatbot />
        <Footerr />
      </div>
    </Router>
  );
}

export default App;