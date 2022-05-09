import React, { useCallback, useState } from "react";
import "./home.scss";
import { useSelector } from "react-redux";
import { format } from "date-format-parse";
const Home = () => {
  const [state, setState] = useState(useSelector((state) => state));
  const [heart, setHeart] = useState(true);
  const hanbleHeart = useCallback(
    (e) => {
      setHeart((state) => !state);
      const nameClass = heart ? "md hydrated active" : "md hydrated ";
      e.target.className = nameClass;
    },
    [heart]
  );
  return (
    <div className="home">
      <div className="home__nav">
        <div className="home__nav--home">
          <img src="assets/img/home.webp" alt="home logo" />
          <span>home</span>
        </div>

        <div className="home__nav--trending">
          <img src="assets/img/trending.webp" alt="trending logo" />
          <span>trending</span>
        </div>

        <div className="home__nav--profil">
          <img src="assets/img/profile.png" alt="profile logo" />
          <span>profil</span>
        </div>
      </div>

      <div className="home__posts">
        <div className="home__posts--createPost">
          <div className="profile">
            <img src={`uploads/profil/${state.picture}`} alt="user img" />
            <div>
              <p>commencer un posts</p>
            </div>
          </div>
          <div className="action">
            <div>
              <img src="assets/img/text.png" alt="text logo" />
              <span>text</span>
            </div>
            <div>
              <img src="assets/img/image.png" alt="img logo" />
              <span>image</span>
            </div>
            <div>
              <img src="assets/img/video.png" alt="vido logo" />
              <span>video</span>
            </div>
          </div>
        </div>

        <div className="home__posts--content">
          <div className="profil">
            <img
              src={`uploads/profil/${state.picture}`}
              alt="post creator img"
            />
            <p>{format(state.createdAt, "DD-MMM-YYYY")}</p>
          </div>
          <div className="post">
            <div className="content">
              <img src={`uploads/profil/${state.picture}`} alt="post img" />
            </div>
          </div>
          <div className="home__posts--action">
            <div className="large-font text-center top-20">
              <ion-icon name="heart" onClick={hanbleHeart}>
                <div className="red-bg"></div>
              </ion-icon>
            </div>
            <div>
              <div className="large-font text-center">
                <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                <span>commentaire</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home__other">
        <div className="home__other_trending">
          <div className="title">
            <h3>trending</h3>
          </div>
          <div className="content">
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
          
          </div>
        </div>
        <div className="home__other__suggestion">
          <div className="title">
            <h3>suggestion</h3>
          </div>

          <div className="content">
          <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            <div>
              <img src={`uploads/profil/${state.picture}`} alt="image du profil" />{" "}
              <span>{state.pseudo}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
