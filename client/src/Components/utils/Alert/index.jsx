import React from "react";
import "./alert.scss";

const Alert = ({ message, onHanbleClik, status }) => {
  return (
    <div className="alert">
      <div className={status}>
        <p>{message}</p>
        <button onClick={onHanbleClik}>compris</button>
      </div>
    </div>
  );
};

export default Alert;
