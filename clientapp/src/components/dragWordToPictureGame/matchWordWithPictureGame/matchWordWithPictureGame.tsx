import React, { useState } from "react";
import DragWordToPictureGameQuestion from "../dragWordToPictureGameQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import {
  SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT,
  SET_MATCH_WORD_WITH_PICTURE_GAME_COMPLETED,
  SET_MATCH_WORD_WITH_PICTURE_GAME_CURRENT_QUESTION
} from "../actions/dragWordToQuestionGameActions";

type MatchWordWithPictureGameQuestionType = {
  answer: string;
  options: Array<{
    word: string;
    image: string;
  }>;
};

const MatchWordWithPictureGame: React.FC<{
  questions: Array<MatchWordWithPictureGameQuestionType>;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector<AppState, number>(
    state =>
      state.dragWordToPictureGame.matchWordWithPictureGame.currentQuestion
  );
  const currentAssignment = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.currentAssignment
  );
  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      dispatch(
        SET_MATCH_WORD_WITH_PICTURE_GAME_CURRENT_QUESTION(currentQuestion + 1)
      );
    } else {
      dispatch(SET_MATCH_WORD_WITH_PICTURE_GAME_COMPLETED(true));
      dispatch(
        SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT(currentAssignment + 1)
      );
    }
  };
  return (
    <DragWordToPictureGameQuestion
      questionNo={currentQuestion}
      question={questions[currentQuestion]}
      getNextQuestion={nextQuestion}
      key={currentQuestion}
    />
  );
};

export default MatchWordWithPictureGame;
