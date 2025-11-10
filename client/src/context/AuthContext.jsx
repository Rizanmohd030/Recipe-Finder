// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Helper to decode JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    return null;
  }
};

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from token on initial mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = parseJwt(token);

      if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
        setUser({
          id: decodedUser.id,
          name: decodedUser.name || decodedUser.email?.split("@")[0] || "User",
          email: decodedUser.email || "unknown",
        });
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // Login → updates context with backend data
 const login = (userData) => {
  if (!userData) return;

  const normalizedUser = {
    id: userData.id || userData._id, // backend sends _id
    name: userData.name || userData.email?.split("@")[0] || "User",
    email: userData.email,
  };

  setUser(normalizedUser);
};
  // Logout → clears context + token + navigates
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const authContextValue = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
