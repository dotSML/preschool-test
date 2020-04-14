import React, { useEffect, useState } from "react";
import PickTheRightWordGameQuestion from "./pickTheRightWordGameQuestion";

type PickTheRightWordGameQuestionArrayType = Array<{
  word: string;
  options: Array<string>;
}>;

const PickTheRightWordGame: React.FC<{
  questions: PickTheRightWordGameQuestionArrayType;
}> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const handleQuestionAnswer = (answer: string, expected: string) => {
    console.log(answer === expected);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(c => c + 1);
    } else {
      setGameCompleted(true);
    }
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div className="pick-the-right-word-game-wrapper">
      {!gameCompleted ? (
        <PickTheRightWordGameQuestion
          question={questions[currentQuestion]}
          handleAnswer={handleQuestionAnswer}
        />
      ) : (
        "GAME COMPLETED"
      )}
    </div>
  );
};

export default PickTheRightWordGame;
