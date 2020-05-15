import React, { ReactNode, useState } from "react";
import { Button } from "reactstrap";
import AudioToTextGame from "../audioToTextGame/audioToTextGame";
import GameBox from "../common/gameBox";
import DragWordToPictureGame from "../dragWordToPictureGame/dragWordToPictureGame";
import ImageSequenceGame from "../imageSequenceGame/imageSequenceGame";
import { gameConfig } from "./gameConfig";
import MonthsGame from "../monthsGame/monthsGame";
import WeekdaysGame from "../weekdaysGame/weekdaysGame";
import NumberSequencingGame from "../numberSequencingGame/numberSequencingGame";
import CalculationGame from "../calculationGame/calculationGame";
import CompareQuantitiesGame from "../compareQuantitiesGame/compareQuantititiesGame";
import AnalogueClockGame from "../analogueClockGame/analogueClockGame";
import DogCanvasGame from "../dogCanvasGame/dogCanvasGame";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { GameReducerStateType } from "./reducers/gameReducer";
import { SET_GAME_CURRENT_GAME } from "./actions/gameActions";
import GameStatus from "./gameStatus";
import Layout from "../layout/layout";

const Game: React.FC = () => {
  const [currentGame, setCurrentGame] = useState(0);
  const gameState = useSelector<AppState, GameReducerStateType>(
    state => state.game
  );
  const dispatch = useDispatch();
  const games = [
    {
      name: "audioToTextGame",
      component: <AudioToTextGame questions={gameConfig.audioToTextGame} />
    },
    {
      name: "dragWordToPictureGame",
      component: (
        <DragWordToPictureGame gameConfig={gameConfig.dragWordToPictureGame} />
      )
    },
    {
      name: "imageSequenceGame",
      component: <ImageSequenceGame questions={gameConfig.imageSequence} />
    },
    {
      name: "monthsGame",
      component: <MonthsGame questions={gameConfig.monthsGame} />
    },
    {
      name: "weekdaysGame",
      component: <WeekdaysGame questions={gameConfig.weekdayGame} />
    },
    {
      name: "numberSequencingGame",
      component: (
        <NumberSequencingGame questions={gameConfig.numberSequencingGame} />
      )
    },
    {
      name: "calculationGame",
      component: <CalculationGame questions={gameConfig.calculationGame} />
    },
    {
      name: "compareQuantitiesGame",
      component: (
        <CompareQuantitiesGame questions={gameConfig.compareQuantitiesGame} />
      )
    },
    {
      name: "analogueClockGame",
      component: <AnalogueClockGame questions={gameConfig.analogueClockGame} />
    },
    {
      name: "dogCanvasGame",
      component: <DogCanvasGame questions={gameConfig.dogCanvasGame} />
    }
  ];

  const noNextGame = () => {
    return gameState.currentGame === games.length - 1;
  };

  const handleNextGameClick = () => {
    if (gameState.currentGame + 1 < games.length) {
      dispatch(SET_GAME_CURRENT_GAME(gameState.currentGame + 1));
    }
  };

  const handlePreviousGameClick = () => {
    if (gameState.currentGame - 1 >= 0) {
      dispatch(SET_GAME_CURRENT_GAME(gameState.currentGame - 1));
    }
  };

  return (
    <GameBox>
      {games[gameState.currentGame].component}
      <GameStatus games={games} currentGame={games[gameState.currentGame]}/>

      {/*<div className="game-buttons">*/}
      {/*  <Button*/}
      {/*    size="lg"*/}
      {/*    color="danger"*/}
      {/*    style={{ marginRight: "1rem", fontWeight: 600 }}*/}
      {/*    disabled={gameState.currentGame === 0}*/}
      {/*    onClick={handlePreviousGameClick}*/}
      {/*  >*/}
      {/*    Eelmine mäng*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    size="lg"*/}
      {/*    color="primary"*/}
      {/*    style={{ fontWeight: 600 }}*/}
      {/*    onClick={*/}
      {/*      noNextGame() ? () => alert("GAME OVER") : handleNextGameClick*/}
      {/*    }*/}
      {/*  >*/}
      {/*    {noNextGame() ? "Lõpeta test" : "Järgmine mäng"}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </GameBox>
  );
};

export default Game;
