import axios from "axios";
import Cookies from "js-cookie";

export const ADD_NEW_USER = "ADD_NEW_USER";

export async function addNewUser(email, password) {
  return await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
      email,
      password,
    })
    .catch((errors) => console.log(errors));
}

export const VERIFY_IF_USER_CONNECT = "VERIFY_IF_USER_CONNECT";

export async function verifyIfUserConnect(id) {
  if (id === undefined) return undefined;

  return await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`)
    .catch((errors) => console.log(errors));
}

export const ADD_NEW_PICTURE = "ADD_NEW_PICTURE";

export async function addNewPicture(userId, picture) {
  const form = new FormData();
  form.append("userId", userId);
  form.append("picture", picture);
  return await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/upload`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((errors) => console.log(errors));
}

export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export async function updateUserInfo(id, pseudo, email, bio) {
  console.log(pseudo,email,bio);
  return await axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`, {
      pseudo,
      email,
      bio,
    })
    .catch((errors) => console.log(errors));
}
