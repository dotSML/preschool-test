import React, {useEffect, useState} from "react";
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
    useEffect(() => {
        window.addEventListener('touchmove', e => e.preventDefault(), {passive: false})

    },[])
  const game = useSelector<AppState, GameReducerStateType>(state => state.game);
  return (
    <div>
      <Layout>
          {!game.gameInitiated && !game.gameCompleted ? <GameInitLanding/> : ""}
          {game.gameInitiated && !game.gameCompleted ? <Game/> : ""}
          {game.gameCompleted && !game.gameInitiated ? <GameEnd/> : ""}
          {/*<GameEnd/>*/}
      </Layout>
    </div>
  );
}

export default App;
