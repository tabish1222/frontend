import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#1976d2", color: "white" }}>
      {isLoggedIn ? (
        <>
          <Link to="/students" style={{ margin: "0 10px", color: "white" }}>
            Students
          </Link>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ margin: "0 10px", color: "white" }}>
            Login
          </Link>
          <Link to="/register" style={{ margin: "0 10px", color: "white" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
