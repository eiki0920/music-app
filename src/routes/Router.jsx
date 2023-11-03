import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import SearchArthist from "../pages/searchArtist";
import ArtistDetail from "../pages/detailArtist";

function Router() {
  const [token, setToken] = useState("");

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

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home token={token} />} />
        <Route exact path="/search" element={<SearchArthist token={token} />} />
        <Route
          exact
          path="/artist/:artist_id"
          element={<ArtistDetail token={token} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
