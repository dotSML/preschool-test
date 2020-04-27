import React, { useState } from "react";
import DragWordToPictureGameQuestion from "../dragWordToPictureGameQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import {
  SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT,
  SET_MATCH_OPPOSITE_WORDS_GAME_RESULTS,
  SET_MATCH_WORD_WITH_PICTURE_GAME_COMPLETED,
  SET_MATCH_WORD_WITH_PICTURE_GAME_CURRENT_QUESTION
} from "../actions/dragWordToQuestionGameActions";
import GameQuestionCounter from "../../common/gameQuestionCounter";
import Game from "../../game/game";
import { POST_GAME_RESULTS } from "../../game/actions/gameActions";

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
  const gameResults = useSelector<AppState, any>(state => state.game.results);
  const [results, setResults] = useState<Array<any>>([]);
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

  const handleAnswer = (correct: boolean) => {
    let tempThisGameResults = results;
    if (currentQuestion === questions.length - 1) {
      tempThisGameResults.push(correct);
      dispatch(
        POST_GAME_RESULTS(
          Object.assign(
            { ...gameResults },
            { matchWordsWithPictureGame: tempThisGameResults }
          )
        )
      );
    } else {
      tempThisGameResults.push(correct);
      setResults(tempThisGameResults);
    }
  };
  return (
    <React.Fragment>
      <GameQuestionCounter
        totalAmountOfQuestions={questions.length}
        currentQuestion={currentQuestion + 1}
      />
      <DragWordToPictureGameQuestion
        handleAnswer={handleAnswer}
        questionNo={currentQuestion}
        question={questions[currentQuestion]}
        getNextQuestion={nextQuestion}
        key={currentQuestion}
      />
    </React.Fragment>
  );
};

export default MatchWordWithPictureGame;
