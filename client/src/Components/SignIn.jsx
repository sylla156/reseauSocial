import React, { useCallback, useState } from 'react'
import axios from 'axios';

const SigbIn = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
 
   const hanbleSubmit = useCallback((e) => {
     e.preventDefault();
     axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/login`,
     {
       email,
       password
     })
          .then((response) => console.log(response))
   },[email,password])
   
   const hanbleChange = useCallback((e) => {
     const type = e.target.type;
     const value = e.target.value;
 
     switch (type) {
       case 'email':
         setEmail(value);
         break;
       
       case 'password':
         setPassword(value);
         break;
     
       default:
         break;
     }
   },[email,password])
  return (
    <form method="post" onSubmit={hanbleSubmit} onChange={hanbleChange}>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">envoyer</button>
      </form>
  )
}

export default SigbIn