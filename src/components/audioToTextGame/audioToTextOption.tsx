import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { POST_AUDIO_TO_TEXT_SELECTED_ANSWER } from "./actions/audioToTextGameActions";

type AudioToTextOptionType = {
  label: string;
  correct: boolean;
};

const AudioToTextOption: React.FC<{
  option: AudioToTextOptionType;
  question: string;
  handleQuestionAnswer: any;
  selectedAnswer: string;
}> = ({ option, question, handleQuestionAnswer, selectedAnswer }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleOptionCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(POST_AUDIO_TO_TEXT_SELECTED_ANSWER(e.target.value));
  };

  return (
    <div className="audio-to-text-option">
      <input
        type="radio"
        onChange={e => {
          handleOptionCheck(e);
          setChecked(!checked);
          handleQuestionAnswer(e.target.value, question);
        }}
        id={option.label}
        value={option.label}
        checked={selectedAnswer === option.label}
        name={question}
      />
      <label style={{ margin: 0 }} htmlFor={option.label}>
        {option.label}
      </label>
    </div>
  );
};

export default AudioToTextOption;
