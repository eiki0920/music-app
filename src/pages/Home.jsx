import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./style/Home.css";

function Home(props) {
  const [playList, setPlaylist] = useState([]);

  const token = props.token;

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbKXQ4mDTEBXq`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("アクセストークンが違う");
        }
        return res.json();
      })
      .then((playlist) => {
        setPlaylist(playlist.tracks.items);
      })
      .catch((error) => {
        console.log("Error:", error);
        console.log("token", token);
      });
  }, [token]);

  return (
    <>
      <h1>Home</h1>
      <Link to="/search" state={{ token: token }}>
        アーティスト検索
      </Link>
      <div id="ranking">
        <h2>今日の国内ランキング</h2>
        {playList.map((music) => (
          <li className="ranking-item" key={music.track.id}>
            <img
              src={music.track.album.images[2].url}
              className="ranking-img"
              alt="アルバム画像"
            />
            <p className="ranking-music">{music.track.album.name}</p>
            <p className="ranking-artist">
              {music.track.album.artists[0].name}
            </p>
          </li>
        ))}
      </div>

      <h1>{playList.description}</h1>
    </>
  );
}

export default Home;
