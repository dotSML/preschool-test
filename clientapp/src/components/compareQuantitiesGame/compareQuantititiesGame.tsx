import React, { useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import StartGameBtn from "../common/startGameBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { CompareQuantitiesGameReducerStateType } from "./reducers/compareQuantitiesGameReducer";
import {
  SET_COMPARE_QUANTITIES_GAME_COMPLETED,
  SET_COMPARE_QUANTITIES_GAME_CURRENT_QUESTION,
  SET_COMPARE_QUANTITIES_GAME_SELECTED_ANSWER,
  SET_COMPARE_QUANTITIES_GAME_STARTED
} from "./actions/compareQuantitiesGameActions";
import GameQuestionCounter from "../common/gameQuestionCounter";
import { EndGameBtn, NextQuestionBtn } from "../common/gameButtons";
import { GameReducerStateType } from "../game/reducers/gameReducer";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";
import { Button } from "reactstrap";

const CompareQuantitiesGame: React.FC<{
  questions: Array<{
    questionType: string;
    options: Array<{ imgPath: string; amount: number }>;
  }>;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const gameState = useSelector<
    AppState,
    CompareQuantitiesGameReducerStateType
  >(state => state.compareQuantitiesGame);
  const gameResults = useSelector<AppState, any>(state => state.game.results);
  const handleGameStart = () => {
    dispatch(
      POST_GAME_RESULTS(
        Object.assign({ ...gameResults }, { compareQuantitiesGame: [] })
      )
    );
    dispatch(SET_COMPARE_QUANTITIES_GAME_SELECTED_ANSWER(0));
    dispatch(SET_COMPARE_QUANTITIES_GAME_CURRENT_QUESTION(0));
    dispatch(SET_COMPARE_QUANTITIES_GAME_STARTED());
  };

  const handleItemClick = (expectedAnswer: number, selectedAnswer: number) => {
    dispatch(SET_COMPARE_QUANTITIES_GAME_SELECTED_ANSWER(selectedAnswer));
    let resultsTempArr = [...gameResults.compareQuantitiesGame];
    let isCorrect = selectedAnswer === expectedAnswer;

    resultsTempArr.push({
      correct: isCorrect,
      expected: expectedAnswer,
      answer: selectedAnswer
    });
    dispatch(
      POST_GAME_RESULTS(
        Object.assign(
          { ...gameResults },
          { compareQuantitiesGame: resultsTempArr }
        )
      )
    );
  };

  const handleGameCompletion = () => {
    dispatch(SET_COMPARE_QUANTITIES_GAME_COMPLETED());
  };

  const renderItem = (option: { imgPath: string; amount: number }) => {
    const questionType = questions[gameState.currentQuestion].questionType;
    let expectedAnswer = 0;

    if (questionType === "more") {
      let arr = questions[gameState.currentQuestion].options;
      let max = arr.sort((a, b) => a.amount - b.amount)[arr.length - 1];
      expectedAnswer = max.amount;
    } else if (questionType === "less") {
      let arr = questions[gameState.currentQuestion].options;
      let min = arr.sort((a, b) => b.amount - a.amount)[arr.length - 1];
      expectedAnswer = min.amount;
    }

    let items = [];
    for (let i = 0; i < option.amount; i++) {
      items.push({ imgPath: option.imgPath, amount: option.amount });
    }

    return (
      <div
        className="compare-quantities-game-item-box"
        style={{
          border:
            gameState.selectedAnswer === option.amount
              ? "2px solid red"
              : "2px solid rgba(0,0,0,.15)"
        }}
        onClick={() => handleItemClick(expectedAnswer, option.amount)}
      >
        {items.map(item => {
          return (
            <div className="compare-quantities-game-item">
              <img
                style={{ height: "100%", width: "auto" }}
                alt={item.imgPath}
                src={process.env.PUBLIC_URL + "/images/compare/" + item.imgPath}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderQuestion = (questionType: string) => {
    if (questionType === "more") {
      return (
        <div className="compare-quantities-game-question">Mida on rohkem?</div>
      );
    } else if (questionType === "less") {
      return (
        <div className="compare-quantities-game-question">Mida on vähem?</div>
      );
    }
  };

  const getNextQuestion = () => {
    dispatch(SET_COMPARE_QUANTITIES_GAME_SELECTED_ANSWER(0));
    dispatch(
      SET_COMPARE_QUANTITIES_GAME_CURRENT_QUESTION(
        gameState.currentQuestion + 1
      )
    );
  };

  return (
    <React.Fragment>
      <GameHeading heading="8. Hulkade võrdlemine" />
      <GameDescription>
        Selles mängus tuleb sul vajutada kasti peale, kus on rohkem asju
      </GameDescription>
      <GameContent>
        {gameState.gameStarted ? (
          <React.Fragment>
            <GameQuestionCounter
              totalAmountOfQuestions={questions.length}
              currentQuestion={gameState.currentQuestion + 1}
            />
            <div className="compare-quantities-game-items">
              <div className="compare-quantities-game-question">
                {renderQuestion(
                  questions[gameState.currentQuestion].questionType
                )}
              </div>
              {questions[gameState.currentQuestion].options.map(option => {
                return renderItem(option);
              })}
            </div>
            {gameState.currentQuestion !== questions.length - 1 &&
            gameState.selectedAnswer ? (
              <NextQuestionBtn handleClick={() => getNextQuestion()} />
            ) : (
              ""
            )}
            {gameState.currentQuestion + 1 === questions.length &&
            gameState.selectedAnswer ? (
              <EndGameBtn handleClick={handleGameCompletion} />
            ) : (
              ""
            )}
          </React.Fragment>
        ) : (
          <StartGameBtn
            handleGameStart={handleGameStart}
            gameCompleted={gameState.gameCompleted}
          />
        )}
      </GameContent>
    </React.Fragment>
  );
};

export default CompareQuantitiesGame;
