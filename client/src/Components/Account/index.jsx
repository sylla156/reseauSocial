import React, { useCallback, useState } from "react";
import "./account.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPicture,
  ADD_NEW_PICTURE,
  updateUserInfo,
  UPDATE_USER_INFO,
} from "../../Actions/userAction";
import Alert from "../utils/Alert";
import image from "../../defaut.jpg";

const Account = () => {
  const state = useSelector((state) => state);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
      <UploadImage />
      <UploadField setError={setError} setSuccess={setSuccess} />
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
          <p>{state.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;

const UploadImage = () => {
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
  return (
    <div className="account__image">
      <img
        src={state.picture ? `uploads/profil/${state.picture}` : image}
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
  );
};

const UploadField = ({ setError, setSuccess }) => {
  const [state, setState] = useState(useSelector((state) => state));
  const dispatch = useDispatch();
  const [pseudo, setPseudo] = useState(state.pseudo);
  const [email, setEmail] = useState(state.email);
  const [bio, setBio] = useState(state.bio ? state.bio : "pas de bio");
  const hanbleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      updateUserInfo(state._id, pseudo, email, bio).then((response) => {
        if (response.data.errors) {
          setError(JSON.stringify(response.data.errors));
          return;
        } else {
          dispatch({ type: UPDATE_USER_INFO, payload: response.data });
          setSuccess("update");
        }
      });
    },
    [pseudo, email, bio]
  );

  const hanbleChange = useCallback(
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
  return (
    <div className="account__field">
      <form onChange={hanbleChange} onSubmit={hanbleSubmit}>
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
  );
};
