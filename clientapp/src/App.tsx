import React, { useState } from "react";
import "./css/style.css";
import Layout from "./components/layout/layout";
import Game from "./components/game/game";
import GameInitLanding from "./components/game/gameInitLanding";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  return (
    <div>
      <img
        alt="bg"
        src={process.env.PUBLIC_URL + "/images/bg.png"}
        className="game-bg"
      />
      <img
        alt="logo"
        src={process.env.PUBLIC_URL + "/images/logo.gif"}
        className="game-logo"
      />
      <Layout>
        <Game />
      </Layout>
    </div>
  );
}

export default App;
