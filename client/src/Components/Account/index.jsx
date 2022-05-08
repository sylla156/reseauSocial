import React, { useCallback, useState } from "react";
import "./account.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPicture,
  ADD_NEW_PICTURE,
  updateUserInfo,
} from "../../Actions/userAction";
import Cookies from "js-cookie";
import Alert from "../utils/Alert";
import image from '../../defaut.jpg';
const Account = () => {
  const [state, setState] = useState(useSelector((state) => state));
  const [picture, setPicture] = useState();
  const dispatch = useDispatch();

  const hanbleChange = useCallback((e) => {
    setPicture(e.target.files[0]);
  });

  const hanbleSubmit = useCallback((e) => {
    e.preventDefault();
    addNewPicture(state._id, picture).then((res) => {
      dispatch({ type: ADD_NEW_PICTURE, payload: res.data });
    });
  });

  const [pseudo, setPseudo] = useState(state.pseudo);
  const [email, setEmail] = useState(state.email);
  const [bio, setBio] = useState(state.bio ? state.bio : "pas de bio");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const hanbleSubmitField = useCallback(
    (e) => {
      e.preventDefault();
      updateUserInfo(state._id, pseudo, email, bio).then((response) => {
        if (response.data.errors) {
          setError(JSON.stringify(response.data.errors));
          return;
        } else {
          dispatch({type:updateUserInfo,payload:response.data})
          setSuccess("creation de compte avec succes");
          console.log(response.data);
        }
      });
    },
    [pseudo, email, bio]
  );

  const hanbleChangeField = useCallback(
    (e) => {
      const type = e.target.type;
      const value = e.target.value;

      switch (type) {
        case "text":
          setPseudo(value);
          break;

        case "email":
          setEmail(value);
          break;

        case "textarea":
          setBio(value);
          break;

        default:
          break;
      }
    },
    [pseudo, email, bio]
  );

  const hanbleError = useCallback(() => {
    setError(false);
  });

  const hanbleSuccess = useCallback(() => {
    setSuccess(false);
  });
  return (
    <div className="account">
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
      <div className="account__image">
        <img
          src={state.picture?`uploads/profil/${state.picture}`:image}
          alt="la vie c'est comment"
        />
        <form onSubmit={hanbleSubmit}>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={hanbleChange}
          />
          <input type="submit" value="upload" />
        </form>
      </div>
      <div className="account__field">
        <form onChange={hanbleChangeField} onSubmit={hanbleSubmitField}>
          <label htmlFor="pseudo">pseudo</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            defaultValue={state.pseudo}
          />
          <br />
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={state.email}
          />
          <br />
          <label htmlFor="bio">bio</label>
          <br />
          <textarea
            name="bio"
            id="bio"
            cols="20"
            rows="5"
            defaultValue={state.bio ? state.bio : "pas de bio"}
          ></textarea>

          <input type="submit" value="update" />
        </form>
      </div>
      <div className="account__action">
        <div>
          <h3>followers</h3>
          <p>{state.followers}</p>
        </div>
        <div>
          <h3>following</h3>
          <p>{state.following}</p>
        </div>
        <div>
          <h3>likers</h3>
          <p>{state.likers}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
