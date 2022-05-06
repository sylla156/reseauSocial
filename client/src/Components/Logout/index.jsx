import React, { useEffect } from "react";
import Cookies from "js-cookie";

const Logout = () => {
  useEffect(() => {
    Cookies.set("id", "", { expires: 0 });
    window.location.pathname = '/';
  },[]);
  return <div>Logout</div>;
};

export default Logout;
