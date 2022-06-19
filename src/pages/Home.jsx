import React from "react";
import Grids from "../components/Grids";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import History from "./History";
import LeaderBoard from "./LeaderBoard";

function Home(props) {
  return (
    <div id="home">
      <Header />

      <Routes>
        <Route path="/" element={<Grids />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
}

export default Home;
