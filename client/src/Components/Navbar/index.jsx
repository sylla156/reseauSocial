import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const state = useSelector((state) => state._id);
  let link;
  if (state == undefined) {
    link = (
      <>
        <Link to="/">Home</Link>
        <Link to="/log">login</Link>;
      </>
    );
  } else {
    link = (
      <>
        <Link to="/logout">logout</Link>
      </>
    );
  }
  return (
    <div className="navbar">
      <h2 className="navbar__title">brahimCode</h2>
      <ul className="navbar__nav">{link}</ul>
    </div>
  );
};

export default Navbar;

const profil = ({name,img}) => {
  return (
    <div className="profil">
      <div className="profil__icone">
        <p>{name}</p>
        <img src={img} alt="photo de profile" />
      </div>
      <div className="profil__details">
        <p>
          <Link to={"/account"}>account</Link>
        </p>
        <p>
          <Link to={"/logout"}>logout</Link>
        </p>
      </div>
    </div>
  );
};
