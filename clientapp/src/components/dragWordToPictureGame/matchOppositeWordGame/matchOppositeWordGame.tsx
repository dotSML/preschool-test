import React, { useEffect, useState } from "react";
import MatchOppositeWordDropZone from "./matchOppositeWordDropZone";
import MatchOppositeWordDraggableWord from "./matchOppositeWordDraggableWord";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import {
  SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT,
  SET_MATCH_OPPOSITE_WORDS_GAME_CURRENT_QUESTION,
  SET_MATCH_OPPOSITE_WORDS_GAME_QUESTIONS,
  SET_MATCH_OPPOSITE_WORDS_GAME_RESULTS
} from "../actions/dragWordToQuestionGameActions";
import { Button } from "reactstrap";
import { MatchOppositeWordsGameQuestionType } from "./matchOppositeWordsGameTypes";
import { shuffleArray } from "../../common/helpers/arrayHelpers";
import { NextAssignmentBtn, NextQuestionBtn } from "../../common/gameButtons";
import GameQuestionCounter from "../../common/gameQuestionCounter";
import { POST_GAME_RESULTS } from "../../game/actions/gameActions";

const MatchOppositeWordGame: React.FC<{
  questions: Array<Array<{ word: string; image: string; match: string }>>;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const gameResults = useSelector<AppState, Array<any>>(
    state => state.game.results
  );
  const currentQuestion = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.matchOppositeWordsGame.currentQuestion
  );
  const currentGameAssignment = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.currentAssignment
  );
  const [optionSlots, setOptionSlots] = useState<Array<string>>([]);
  const [results, setResults] = useState<Array<any>>([]);

  const allQuestions = useSelector<AppState, Array<any>>(
    state => state.dragWordToPictureGame.matchOppositeWordsGame.questions
  );
  useEffect(() => {
    let questionsArr: any = [];

    questions.forEach(question => {
      let questionObj: any = { question: question };
      let options: any = [];

      question.forEach(item => {
        options.push(item.match);
        questionObj.options = options;
      });
      questionsArr.push(questionObj);
    });
    dispatch(SET_MATCH_OPPOSITE_WORDS_GAME_QUESTIONS(questionsArr));
  }, [dispatch, questions]);

  useEffect(() => {
    if (allQuestions.length) {
      setOptionSlots([...shuffleArray(allQuestions[currentQuestion].options)]);
    }
  }, [dispatch, allQuestions, currentQuestion]);

  const handleOptionDrop = (droppedOption: string, expected: string) => {
    setOptionSlots(options => options.filter(x => x !== droppedOption));
    let resultArr: Array<any> = [...results];
    resultArr.push({
      expected: expected,
      answer: droppedOption,
      correct: droppedOption === expected
    });
    setResults(resultArr);
  };

  const handleNextQuestion = () => {
    dispatch(
      SET_MATCH_OPPOSITE_WORDS_GAME_CURRENT_QUESTION(currentQuestion + 1)
    );
  };

  const handleNextAssignment = () => {
    dispatch(
      POST_GAME_RESULTS(
        Object.assign({ ...gameResults }, { matchOppositeWordGame: results })
      )
    );
    dispatch(
      SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT(
        currentGameAssignment + 1
      )
    );
  };

  return (
    <div className="match-opposite-words-game-wrapper">
      <GameQuestionCounter
        totalAmountOfQuestions={questions.length}
        currentQuestion={currentQuestion + 1}
      />
      <div className="match-opposite-words-game-options">
        {allQuestions.length
          ? allQuestions[currentQuestion].question.map(
              (question: MatchOppositeWordsGameQuestionType) => {
                return (
                  <MatchOppositeWordDropZone
                    question={question}
                    handleDrop={handleOptionDrop}
                  />
                );
              }
            )
          : ""}
      </div>
      <div
        className="match-opposite-words-game-options"
        style={{ marginTop: "2rem" }}
      >
        {optionSlots.length ? (
          optionSlots.map((option: string) => {
            return <MatchOppositeWordDraggableWord word={{ word: option }} />;
          })
        ) : allQuestions.length > currentQuestion + 1 ? (
          <NextQuestionBtn handleClick={handleNextQuestion} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Mäng läbi!
            <NextAssignmentBtn handleClick={handleNextAssignment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchOppositeWordGame;
