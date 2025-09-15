import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>
        Home
      </Link>
      <Link to="/login" style={{ margin: "0 10px", color: "#fff" }}>
        Login
      </Link>
      <Link to="/register" style={{ margin: "0 10px", color: "#fff" }}>
        Register
      </Link>
      <Link to="/dashboard" style={{ margin: "0 10px", color: "#fff" }}>
        Dashboard
      </Link>
    </nav>
  );
}

export default Navbar;
