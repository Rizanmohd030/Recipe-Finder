
import React from 'react';
import { Link } from 'react-router-dom';

import {  useAuth } from '../context/AuthContext';

import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // After logging out, we might want to navigate the user to the homepage.
    // We can add that logic here or in the context itself.
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Link the brand/logo to the homepage */}
        <Link to="/" className="navbar-logo">RecipeHunt</Link>
      </div>

      <ul className="navbar-links">
        {/* 5. This is the core of our dynamic UI. We use a ternary operator to check if a `user` object exists. */}
        {user ? (
          // If `user` exists, the user is logged in. Show these links.
          <>
            <li className="navbar-greeting">Welcome, {user.name}!</li>
            <li>
              <Link to="/favorites">My Favorites</Link>
            </li>
            <li>
              {/* This button will trigger the logout process. */}
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          // If `user` is null, the user is logged out. Show these links.
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;