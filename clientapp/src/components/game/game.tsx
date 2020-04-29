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

const Game: React.FC = () => {
  const [currentGame, setCurrentGame] = useState(0);
  const games = [
    {
      name: "Audio To Text",
      component: <AudioToTextGame questions={gameConfig.audioToTextGame} />
    },
    {
      name: "Drag word to picture",
      component: (
        <DragWordToPictureGame gameConfig={gameConfig.dragWordToPictureGame} />
      )
    },
    {
      name: "Image sequence",
      component: <ImageSequenceGame questions={gameConfig.imageSequence} />
    },
    {
      name: "Months",
      component: <MonthsGame questions={gameConfig.monthsGame} />
    },
    {
      name: "Weekdays Game",
      component: <WeekdaysGame questions={gameConfig.weekdayGame} />
    },
    {
      name: "Number Sequencing Game",
      component: (
        <NumberSequencingGame questions={gameConfig.numberSequencingGame} />
      )
    },
    {
      name: "Calculation Game",
      component: <CalculationGame questions={gameConfig.calculationGame} />
    },
    {
      name: "Quantities Comparison",
      component: (
        <CompareQuantitiesGame questions={gameConfig.compareQuantitiesGame} />
      )
    }
  ];

  const noNextGame = () => {
    return currentGame === games.length - 1;
  };

  const handleNextGameClick = () => {
    if (currentGame + 1 < games.length) {
      setCurrentGame(currentGame + 1);
    }
  };

  const handlePreviousGameClick = () => {
    if (currentGame - 1 >= 0) {
      setCurrentGame(currentGame - 1);
    }
  };

  return (
    <GameBox>
      {games[currentGame].component}
      <div className="game-buttons">
        <Button
          size="lg"
          color="danger"
          style={{ marginRight: "1rem", fontWeight: 600 }}
          disabled={currentGame === 0}
          onClick={handlePreviousGameClick}
        >
          Eelmine mäng
        </Button>
        <Button
          size="lg"
          color="primary"
          style={{ fontWeight: 600 }}
          onClick={
            noNextGame() ? () => alert("GAME OVER") : handleNextGameClick
          }
        >
          {noNextGame() ? "Lõpeta test" : "Järgmine mäng"}
        </Button>
      </div>
    </GameBox>
  );
};

export default Game;
