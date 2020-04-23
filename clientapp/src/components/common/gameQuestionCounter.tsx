import React from "react";

const GameQuestionCounter: React.FC<{
  totalAmountOfQuestions: number;
  currentQuestion: number;
}> = ({ totalAmountOfQuestions, currentQuestion }) => {
  return (
    <div className="game-question-counter">
      KÜSIMUS {currentQuestion}/{totalAmountOfQuestions}
    </div>
  );
};

export default GameQuestionCounter;
