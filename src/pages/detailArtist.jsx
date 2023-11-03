import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ArtistDetail(props) {
  const params = useParams();
  const [artistData, setArtistData] = useState({});

  const token = props.token;
  console.log(token);

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${params.artist_id}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        return response.json();
      })
      .then((artist) => {
        console.log(artist);
        console.log(artist.images[0].url);
        setArtistData(artist);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.artist_id]);

  return (
    <>
      <h2>アーティスト詳細ページ</h2>
      <li>{artistData.name}</li>
      <h2>{artistData.type}</h2>
      {artistData.followers && (
        <li>フォロワー: {artistData.followers.total}</li>
      )}

      {artistData.images && (
        <div className="artist-image">
          <img src={artistData.images[0].url} alt="artist-img" />
        </div>
      )}

      {/* <div className="artist-description">
          <ul>
            <li>{artistData.name}</li>
            <li>フォロワー: {artistData.followers.total}</li>
          </ul>
          <Link to={artistData.external_urls.spotify}>spotifyで聞いてみる</Link>
        </div> */}
    </>
  );
}

export default ArtistDetail;
