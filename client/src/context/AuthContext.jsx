import React, { createContext, useState, useEffect, useContext } from "react";

// Create our global auth context
export const AuthContext = createContext(null);

// Custom hook for easy usage: const { user, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // "user" holds all logged-in user data
  const [user, setUser] = useState(null);

  /**
   * ----------------------------------------------------
   * Load user from localStorage on page refresh
   * ----------------------------------------------------
   * This makes the login persistent.
   * Without this, refreshing the website would lose the user
   * and show "Hi, User" or logged-out state.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      // restore user object
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * ----------------------------------------------------
   * Login handler
   * ----------------------------------------------------
   * Called by LoginPage when login is successful.
   * Stores the full user + token in both React state AND localStorage.
   * This ensures:
   *    - Navbar shows correct name instantly
   *    - After refresh, the name persists
   */
  const login = (data) => {
    const normalizedUser = {
      id: data._id || data.id, // backend can send _id or id
      name: data.name,
      email: data.email,
      token: data.token,
    };

    setUser(normalizedUser);

    // Persist user session
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", data.token);
  };

  /**
   * ----------------------------------------------------
   * Logout handler
   * ----------------------------------------------------
   * Clears user from state and localStorage.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
