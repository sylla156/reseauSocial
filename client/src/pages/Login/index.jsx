import React from "react";
import SignUp from "../../Components/SignUp";
import SignIn from "../../Components/SignIn";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login__left">
        <SignUp />
      </div>
      <div className="login__right">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
