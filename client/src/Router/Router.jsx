import React, { useEffect, useState } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  verifyIfUserConnect,
  VERIFY_IF_USER_CONNECT,
} from "../Actions/userAction";
import NoFound from "../Components/NoFound/NoFound";

const Router = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const id = Cookies.get("id");

  useEffect(() => {
    if (id !== undefined) {
      if (state._id === undefined) {
        verifyIfUserConnect(id).then((value) => {
          dispatch({ type: VERIFY_IF_USER_CONNECT, payload: value.data });
        });
      }
    }
  }, [id]);

  let route;
  if (state._id == undefined) {
    route = (
      <Routes>
        <Route path="/" index element={<Home />}>
          home
        </Route>
        <Route path="/log" element={<Login />}>
          login
        </Route>
      </Routes>
    );
  } else {
    route = (
      <Routes>
        <Route path="/" index element={<Home />}/>
        


       {/* REDIRECT */}
        <Route path="/log" element={<Home />}/>
        
        <Route path='*' element={<NoFound/>} />
      </Routes>
    );
  }

  return route;
};

export default Router;
