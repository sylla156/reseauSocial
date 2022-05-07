import React from "react";
import img from '../../uploads/profil/defaut.jpg';
import './account.scss';

const Account = () => {
  return (
    <div className="account">
      <div className="account__image">
        <img src={img} alt="profils image" />
        <form>
          <input type="file" name="picture" id="picture"  />
          <input type="submit" value="upload" />
        </form>
      </div>
      <div className="account__field">
        <form>
          <label htmlFor="pseudo">pseudo</label>
          <input type="text" name="pseudo" id="pseudo" />
<br />
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" />
<br />
          <label htmlFor="bio">bio</label><br />
          <textarea name="bio" id="bio" cols="20" rows="5" defaultValue={'salut les gens'}>
            
          </textarea>

          <input type="submit" value="update" />
        </form>
      </div>
      <div className="account__action">
        <div>
          <h3>followers</h3>
          <p>50</p>
        </div>
        <div>
          <h3>following</h3>
          <p>50</p>
        </div>
        <div>
          <h3>likers</h3>
          <p>50</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
