import React, { useState } from "react";
import "./css/style.css";
import Layout from "./components/layout/layout";
import Game from "./components/game/game";
import GameInitLanding from "./components/game/gameInitLanding";
import {useSelector} from "react-redux";
import {AppState} from "./store/store";
import {GameReducerStateType} from "./components/game/reducers/gameReducer";
import GameStatus from "./components/game/gameStatus";
import GameEnd from "./components/game/gameEnd";

function App() {
  const game = useSelector<AppState, GameReducerStateType>(state => state.game);
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
          {game.gameInitiated && !game.gameCompleted ? <Game/> : <GameInitLanding/>}
          {/*{!game.gameInitiated && !game.gameCompleted ? <GameEnd/> : ""}*/}
      </Layout>
    </div>
  );
}

export default App;
