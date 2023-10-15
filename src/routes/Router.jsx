import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import SearchArthist from "../pages/searchArtist";
import ArtistDetail from "../pages/detailArtist";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<SearchArthist />} />
        <Route
          exact
          path="/artist/:artist_id"
          element={<ArtistDetail />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
