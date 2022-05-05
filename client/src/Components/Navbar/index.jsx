import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className="navbar__title">brahimCode</h2>
      <ul className="navbar__nav">
        <Link to="/">Home</Link>

        <Link to="/log">Log</Link>
      </ul>
    </div>
  );
};

export default Navbar;
