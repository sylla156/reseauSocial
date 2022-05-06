import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.scss";
import image from "../../uploads/profil/defaut.jpg";
const Navbar = () => {
  const state = useSelector((state) => state);
  let link;
  if (state._id === undefined) {
    link = (
      <>
        <Link to="/">Home</Link>
        <Link to="/log">login</Link>;
      </>
    );
  } else {
    link = <Profil name={state.pseudo} image={image} />;
  }
  return (
    <div className="navbar">
      <h2 className="navbar__title">brahimCode</h2>
      <ul className="navbar__nav">{link}</ul>
    </div>
  );
};

export default Navbar;

const Profil = ({ name, image }) => {
  const detailsRef = useRef();
  const [show, setShow] = useState(false);
  const onHanbleNavbar = useCallback(() => {
    setShow((show) => !show);
  });

  useEffect(() => {
    let nameClass = show ? "profil__details showDetails" : "profil__details";
    detailsRef.current.className = nameClass;
  });
  return (
    <div className="profil">
      <div className="profil__icone" onClick={onHanbleNavbar}>
        <p>{name}</p>
        <img src={image} alt="photo de profile" />
      </div>
      <div className="profil__details" ref={detailsRef}>
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
