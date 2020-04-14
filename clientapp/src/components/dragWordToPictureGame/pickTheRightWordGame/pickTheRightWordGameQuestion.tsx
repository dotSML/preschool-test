import React from "react";
import { Button } from "reactstrap";

type PickTheRightWordGameQuestionType = {
  word: string;
  options: Array<string>;
};

const PickTheRightWordGameQuestion: React.FC<{
  question: PickTheRightWordGameQuestionType;
  handleAnswer: (answer: string, expected: string) => void;
}> = ({ question, handleAnswer }) => {
  return (
    <div className="pick-the-right-word-game-question">
      <div className="pick-the-right-word-game-question-image">
        {question.word}
      </div>
      <div className="pick-the-right-word-game-question-options">
        {question.options.map(option => {
          return (
            <Button
              size="lg"
              color="success"
              onClick={() => handleAnswer(option, question.word)}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PickTheRightWordGameQuestion;
