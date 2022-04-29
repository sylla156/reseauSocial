import axios from "axios";

export const ADD_NEW_USER = "ADD_NEW_USER";

export  async function addNewUser(email, password) {
   return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, 
 {
   email,
   password
  }).catch(errors => console.log(errors))

}
