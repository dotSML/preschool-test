import React, { ReactNode, useState } from "react";
import { Button } from "reactstrap";
import AudioToTextGame from "../audioToTextGame/audioToTextGame";
import GameBox from "../common/gameBox";
import DragWordToPictureGame from "../dragWordToPictureGame/dragWordToPictureGame";
import ImageSequenceGame from "../imageSequenceGame/imageSequenceGame";
import { gameConfig } from "./gameConfig";

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
    { name: "Image sequence", component: <ImageSequenceGame /> }
  ];

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
          style={{ marginRight: "1rem" }}
          disabled={currentGame === 0}
          onClick={handlePreviousGameClick}
        >
          Eelmine mäng
        </Button>
        <Button
          size="lg"
          color="primary"
          onClick={handleNextGameClick}
          disabled={currentGame === games.length - 1}
        >
          Järgmine mäng
        </Button>
      </div>
    </GameBox>
  );
};

export default Game;
