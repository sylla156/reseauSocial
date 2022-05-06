import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser, ADD_NEW_USER } from "../../Actions/userAction";
import Cookies from 'js-cookie'
import Alert from "../utils/Alert";
import "./signIn.scss";

const SigbIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const hanbleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addNewUser(email, password).then((res) => console.log(res));
      addNewUser(email, password).then((res) => {
        //for controls the message errors
        if (typeof res.data == "string") setError(res.data);
        if (typeof res.data == "object") {
          dispatch({ type: ADD_NEW_USER, payload: res.data });
          Cookies.set('id',res.data._id,{ expires: 1 })
          setSuccess("connection reussir");
        }
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

  const hanbleError = useCallback(() => {
    setError(false);
  }, []);

  const hanbleSuccess = useCallback(() => {
    setSuccess(false);
  });

  return (
    <div className="signIn">
      {error && (
        <Alert message={error} onHanbleClik={hanbleError} status="error" />
      )}
      {success && (
        <Alert
          message={success}
          onHanbleClik={hanbleSuccess}
          status="success"
        />
      )}
      <h2 className="signIn__title">SignIn</h2>
      <form method="post" onSubmit={hanbleSubmit} onChange={hanbleChange}>
        <label htmlFor="emaill">email</label>
        <input type="email" name="email" id="emaill" />

        <label htmlFor="passworrd">password</label>
        <input type="password" name="password" id="passworrd" />

        <button type="submit">envoyer</button>
      </form>
    </div>
  );
};

export default SigbIn;
