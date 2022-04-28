import axios from "axios";

export const ADD_NEW_USER = "ADD_NEW_USER";

export  async function addNewUser(email, password) {
 const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/login`, {
    email: email,
    password: password,
  });
  return res.data;
}
