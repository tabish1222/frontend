// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <Link to="/" style={styles.link}>
          🏫 SchoolApp
        </Link>
      </div>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.userRole}>{user.role.toUpperCase()}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/" style={styles.link}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#fff",
    color: "#1976d2",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  userRole: {
    fontWeight: "bold",
  },
};
