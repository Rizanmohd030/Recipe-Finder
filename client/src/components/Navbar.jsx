// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="nav-container">
      <div className="nav-inner">

        {/* Brand */}
        <Link to="/" className="nav-logo">
          Recipe<span>Hunt</span>
        </Link>

        {/* Links */}
        <ul className="nav-links">
          {user ? (
            <>
              <li className="nav-greeting">Hi, {user.name}</li>

              <li>
                <Link to="/favorites" className="nav-link">
                  Favorites
                </Link>
              </li>

              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-btn">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
