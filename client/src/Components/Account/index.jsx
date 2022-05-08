import React, { useCallback, useState } from "react";
import './account.scss';
import {useDispatch, useSelector} from 'react-redux';
import { addNewPicture, ADD_NEW_PICTURE } from "../../Actions/userAction";
import Cookies from "js-cookie";

const Account = () => {
  const [state,setState] = useState(useSelector(state => state));
  const [picture,setPicture] = useState();
  const dispatch = useDispatch();

  const hanbleChange = useCallback((e) => {
      setPicture(e.target.files[0]);
  })

  const hanbleSubmit = useCallback((e) => {
    e.preventDefault();
    addNewPicture(state._id,picture).then(res => {
      dispatch({ type: ADD_NEW_PICTURE, payload: res.data });
    })
  })

  return (
    <div className="account">
      <div className="account__image">
        <img src={`uploads/profil/${state.picture}`} alt="la vie c'est comment"  />
        <form  onSubmit={hanbleSubmit}>
          <input type="file" name="picture" id="picture"  onChange={hanbleChange} />
          <input type="submit" value="upload" />
        </form>
      </div>
      <div className="account__field">
        <form>
          <label htmlFor="pseudo">pseudo</label>
          <input type="text" name="pseudo" id="pseudo" defaultValue={state.pseudo}/>
<br />
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" defaultValue={state.email} />
<br />
          <label htmlFor="bio">bio</label><br />
          <textarea name="bio" id="bio" cols="20" rows="5" defaultValue={state.bio?state.bio:'pas de bio'}>
            
          </textarea>

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
