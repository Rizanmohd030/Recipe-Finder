// src/components/Footer.jsx

import React from "react";

/**
 * A minimal, clean footer with off-white background.
 * Removes links and branding for a professional, simple look.
 */
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f8f8", // soft off-white background
        color: "#333", // dark gray text for contrast
        padding: "1rem 2rem",
        textAlign: "center",
        borderTop: "1px solid #e0e0e0",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
        marginTop: "auto",
      }}
    >
      <p
        style={{
          margin: "0.2rem 0",
          fontSize: "0.95rem",
          color: "#444",
          letterSpacing: "0.3px",
        }}
      >
        © {new Date().getFullYear()} — Built with by{" "}
        <span style={{ fontWeight: 600, color: "#555" }}>
          Rizan Mohammed Ismail
        </span>
      </p>
    </footer>
  );
};

export default Footer;
