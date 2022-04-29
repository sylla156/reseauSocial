import React from "react";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const Login = () => {
  return (
    <div className="login">
      <div className="left">
        <SignUp />
      </div>
      <div className="right">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
