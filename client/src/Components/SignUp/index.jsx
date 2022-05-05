import React, { useCallback, useState } from "react";
import axios from "axios";
import Alert from "../utils/Alert";
import "./signUp.scss";

const SignUp = () => {
  const [pseudo, setPseudo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const hanbleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, {
          pseudo,
          email,
          password,
        })
        .then((response) => {
          if (response.data.errors) {
            setError(JSON.stringify(response.data.errors));
            return;
          } else {
            setSuccess("creation de compte avec succes");
          }
        });
    },
    [pseudo, email, password]
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

        case "password":
          setPassword(value);
          break;

        default:
          break;
      }
    },
    [pseudo, email, password]
  );

  const hanbleError = useCallback(() => {
    setError(false);
  });

  const hanbleSuccess = useCallback(() => {
    setSuccess(false);
  });
  return (
    <div className="signUp">
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
      <h2 className="signUp__title">signUp</h2>
      <form method="post" onSubmit={hanbleSubmit} onChange={hanbleChange}>
        <label htmlFor="pseudo">pseudo</label>
        <input type="text" name="pseudo" id="pseudo" />

        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">envoyer</button>
      </form>
    </div>
  );
};

export default SignUp;
