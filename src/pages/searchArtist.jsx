import { useState } from "react";
import { Link } from "react-router-dom";

import "./style/searchArtist.css";

const token = process.env.REACT_APP_API_TOKEN;

function SearchArthist() {
  const [artistTerm, setArtistTerm] = useState("");
  const [artistInformation, setArtistInformation] = useState([]);

  const getArtist = (e) => {
    setArtistTerm(e.target.value);
    if (artistTerm) {
      fetch(
        `https://api.spotify.com/v1/search?q=${artistTerm}&type=artist&limit=20`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          console.log(info.artists.items);
          setArtistInformation(info.artists.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="search-artist-container">
      <h2>検索</h2>

      <label htmlFor="term">
        アーティスト、曲、アルバムを入力してください
        <br />
        <input type="text" id="term" onChange={getArtist} />
      </label>

      <div className="search-result">
        {artistInformation.map((artist) => (
          <p key={artist.id}>
            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
          </p>
        ))}
      </div>
    </div>
  );
}

export default SearchArthist;
