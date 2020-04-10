import React from "react";
import "./css/style.css";
import Navigation from "./components/layout/navigation/navigation";
import Layout from "./components/layout/layout";
import AudioToTextGame from "./components/audioToTextGame/audioToTextGame";
import Game from "./components/game/game";

function App() {
  return (
    <div>
      <Layout>
        <Game />
      </Layout>
    </div>
  );
}

export default App;
