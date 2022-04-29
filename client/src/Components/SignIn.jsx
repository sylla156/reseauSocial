import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewUser, ADD_NEW_USER } from "../Actions/userAction";
import Alert from "./utils/Alert";

const SigbIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const hanbleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addNewUser(email, password).then((res) => console.log(res));
      addNewUser(email, password).then((res) => {
        //for controls the message errors
        if (typeof res.data == "string") setError(res.data);
        if (typeof res.data == "object")
          dispatch({ type: ADD_NEW_USER, payload: res.data });
      });
    },
    [email, password]
  );

  const hanbleChange = useCallback(
    (e) => {
      const type = e.target.type;
      const value = e.target.value;

      switch (type) {
        case "email":
          setEmail(value);
          break;

        case "password":
          setPassword(value);
          break;

        default:
          break;
      }
    },
    [email, password]
  );

  const hanbleError = useCallback((e) => {
    setError(false)
  },[error])
  
  return (
    <>
    {error != false && <Alert message={error} onHanbleClik={hanbleError} />}
    <form method="post" onSubmit={hanbleSubmit} onChange={hanbleChange}>
      <label htmlFor="emaill">email</label>
      <input type="email" name="email" id="emaill" />

      <label htmlFor="passworrd">password</label>
      <input type="password" name="password" id="passworrd" />

      <button type="submit">envoyer</button>
    </form>
    </>
  );
};

export default SigbIn;
