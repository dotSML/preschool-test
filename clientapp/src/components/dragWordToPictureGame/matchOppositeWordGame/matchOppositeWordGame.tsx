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

const MatchOppositeWordGame: React.FC<{
  questions: Array<Array<{ word: string; image: string; match: string }>>;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.matchOppositeWordsGame.currentQuestion
  );
  const currentGameAssignment = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.currentAssignment
  );
  const [optionSlots, setOptionSlots] = useState<Array<string>>([]);
  const gameResults = useSelector<AppState, Array<any>>(
    state => state.dragWordToPictureGame.matchOppositeWordsGame.results
  );

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
    let resultArr: Array<any> = [...gameResults];
    resultArr.push({
      expected: expected,
      answer: droppedOption,
      correct: droppedOption === expected
    });

    dispatch(SET_MATCH_OPPOSITE_WORDS_GAME_RESULTS(resultArr));
  };

  const handleNextQuestion = () => {
    dispatch(
      SET_MATCH_OPPOSITE_WORDS_GAME_CURRENT_QUESTION(currentQuestion + 1)
    );
  };

  const handleNextAssignment = () => {
    dispatch(
      SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT(
        currentGameAssignment + 1
      )
    );
  };

  return (
    <div className="match-opposite-words-game-wrapper">
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
          <Button color="success" onClick={handleNextQuestion}>
            Järgmine küsimus
          </Button>
        ) : (
          <div>
            Mäng läbi!
            <Button color="success" onClick={handleNextAssignment}>
              Järgmine ülesanne
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchOppositeWordGame;
