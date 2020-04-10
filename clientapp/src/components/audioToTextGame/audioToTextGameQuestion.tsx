import React, { useState } from "react";
import AudioToTextOption from "./audioToTextOption";

type AudioToTextGameQuestionType = {
  question: string;
  options: Array<{ label: string; correct: boolean }>;
};

const AudioToTextGameQuestion: React.FC<{
  questionProp: AudioToTextGameQuestionType;
  handleQuestionAnswer: any;
  selectedAnswer: string;
}> = ({ questionProp, handleQuestionAnswer, selectedAnswer }) => {
  return (
    <div className="audio-to-text-question">
      <div className="audio-to-text-question-text">{questionProp.question}</div>
      <div className="audio-to-text-options">
        {questionProp?.options.map((option, idx) => {
          return (
            <AudioToTextOption
              key={idx}
              option={option}
              handleQuestionAnswer={handleQuestionAnswer}
              question={questionProp.question}
              selectedAnswer={selectedAnswer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AudioToTextGameQuestion;
