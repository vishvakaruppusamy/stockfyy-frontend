import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import logo from "../assets/logo.jpg"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3 app-header">
      <div className="container-fluid">

<Link className="navbar-brand d-flex align-items-center text-info" to="/">
  <img 
    src={logo} 
    alt="Stockfyy Logo" 
    className="logo-img me-2" 
    style={{ width: "35px", height: "35px", borderRadius: "50%" }}
  />
  <span>Stockfyy</span>
</Link>


        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto d-flex align-items-center">
             {/* This link correctly points to the dashboard */}
            <Link to="/dashboard" className="nav-link text-white me-3">Dashboard</Link>
            <Link to="/login">
              <button className="btn btn-login me-lg-2 mb-2 mb-lg-0">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-signup">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Header;