import React, { useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import StartGameBtn from "../common/startGameBtn";

const CompareQuantitiesGame: React.FC<{
  questions: Array<{
    questionType: string;
    options: Array<{ imgPath: string; amount: number }>;
  }>;
}> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleGameStart = () => {
    setCurrentQuestion(0);
    setGameStarted(true);
  };

  const renderQuestion = (question: {
    questionType: string;
    options: Array<{ imgPath: string; amount: number }>;
  }) => {
    return <div className="compare-quantities-game-items">{}</div>;
  };

  return (
    <React.Fragment>
      <GameHeading heading="8. Hulkade võrdlemine" />
      <GameDescription>
        Selles mängus tuleb sul vajutada kasti peale, kus on rohkem asju
      </GameDescription>
      <GameContent>
        {gameStarted ? (
          <React.Fragment>{questions[0].questionType}</React.Fragment>
        ) : (
          <StartGameBtn handleGameStart={handleGameStart} />
        )}
      </GameContent>
    </React.Fragment>
  );
};

export default CompareQuantitiesGame;
