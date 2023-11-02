import { useEffect, useState } from "react";

function Home() {
  const [token, setToken] = useState("");
  const [playList, setPlaylist] = useState({});

  useEffect(() => {
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${process.env.REACT_APP_API_CLIENT}:${process.env.REACT_APP_API_CLIENT_SECRET}`
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.REACT_APP_API_REFRESH_TOKEN,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((tokenData) => {
        setToken(tokenData.access_token);
      });
  }, []);

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
        console.log(playlist);
        setPlaylist(playlist);
      })
      .catch((error) => {
        console.log("Error:", error);
        console.log("token", token);
      });
  }, [token]);

  return (
    <>
      <h1>Home</h1>
      <h1>{playList.description}</h1>
    </>
  );
}

export default Home;
