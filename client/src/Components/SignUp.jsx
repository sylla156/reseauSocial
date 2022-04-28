import React, { useCallback, useState } from 'react'
import axios from 'axios';

const SignUp = () => {
    const [pseudo, setPseudo] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
 
   const hanbleSubmit = useCallback((e) => {
     e.preventDefault();
     axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/register`,
     {
       pseudo,
       email,
       password
     })
          .then((response) => console.log(response))
   },[pseudo,email,password])
   
   const hanbleChange = useCallback((e) => {
     const type = e.target.type;
     const value = e.target.value;
 
     switch (type) {
       case 'text':
         setPseudo(value);
         break;
 
       case 'email':
         setEmail(value);
         break;
       
       case 'password':
         setPassword(value);
         break;
     
       default:
         break;
     }
   },[pseudo,email,password])
  return (
    <form method="post" onSubmit={hanbleSubmit} onChange={hanbleChange}>
        <label htmlFor="pseudo">pseudo</label>
        <input type="text" name="pseudo" id="pseudo" />

        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">envoyer</button>
      </form>
  )
}

export default SignUp