import React, { useState } from "react";
import "./css/style.css";
import Layout from "./components/layout/layout";
import Game from "./components/game/game";
import GameInitLanding from "./components/game/gameInitLanding";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  return (
    <div>
      <Layout>
        <Game />
      </Layout>
    </div>
  );
}

export default App;
