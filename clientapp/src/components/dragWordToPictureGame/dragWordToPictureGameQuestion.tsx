import React from "react";
import DropTargetImage from "./dropTargetImage";
import DraggableWord from "./draggableWord";
import { DragWordToPictureGameQuestionType } from "./dragWordToPictureGame";

const DragWordToPictureGameQuestion: React.FC<{
  question: DragWordToPictureGameQuestionType;
  getNextQuestion: Function;
  questionNo: number;
  handleAnswer: Function;
}> = ({ question, getNextQuestion, questionNo, handleAnswer }) => {
  return (
    <div className="drag-word-to-picture-game-question">
      <div className="drag-word-to-picture-game-options">
        {question.options.map((option, idx) => {
          return (
            <DropTargetImage
              handleAnswer={handleAnswer}
              key={option.word}
              imgProp={option}
              getNextQuestion={getNextQuestion}
            />
          );
        })}
      </div>
      <div className="drag-word-to-picture-game-wordbox-wrapper">
        <DraggableWord key={question.answer + 69} word={question.answer} />
      </div>
    </div>
  );
};

export default DragWordToPictureGameQuestion;
