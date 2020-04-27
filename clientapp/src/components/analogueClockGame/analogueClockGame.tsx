import React, { useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import StartGameBtn from "../common/startGameBtn";

const AnalogueClockGame = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const handleGameStart = () => {
    setCurrentQuestion(0);
    setGameStarted(true);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <GameHeading heading="9. Kella tundmine" />
        <GameDescription>
          Selles mängus tuleb sul vajutada kella peale, mis näitab õiget aega
        </GameDescription>
        <GameContent>
          {gameStarted ? (
            <React.Fragment>GAAME</React.Fragment>
          ) : (
            <StartGameBtn handleGameStart={handleGameStart} />
          )}
        </GameContent>
      </React.Fragment>
    </React.Fragment>
  );
};

export default AnalogueClockGame;
