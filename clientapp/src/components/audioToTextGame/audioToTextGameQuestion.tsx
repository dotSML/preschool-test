import React, { useState } from "react";
import AudioToTextOption from "./audioToTextOption";
import AudioBtn from "../common/audioBtn";

type AudioToTextGameQuestionType = {
  question: string;
  options: Array<{ label: string; correct: boolean }>;
};

const AudioToTextGameQuestion: React.FC<{
  questionProp: AudioToTextGameQuestionType;
  handleQuestionAnswer: any;
  selectedAnswer: string;
  questionNo: number;
}> = ({ questionProp, handleQuestionAnswer, selectedAnswer, questionNo }) => {
  return (
    <div className="audio-to-text-question">
      <div className="audio-to-text-question-text">
        <span style={{ marginRight: "1rem" }}> {questionProp.question}</span>
        <AudioBtn audioFile={`/task1/task1-question${questionNo + 1}.m4a`} />
      </div>
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
