import React, { useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import StartGameBtn from "../common/startGameBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import {
  SET_ANALOGUE_CLOCK_GAME_COMPLETED,
  SET_ANALOGUE_CLOCK_GAME_CURRENT_QUESTION,
  SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER,
  SET_ANALOGUE_CLOCK_GAME_STARTED
} from "./actions/analogueClockGameActions";
import { EndGameBtn, NextQuestionBtn } from "../common/gameButtons";
import GameQuestionCounter from "../common/gameQuestionCounter";
import { GameReducerStateType } from "../game/reducers/gameReducer";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";

const AnalogueClockGame: React.FC<{
  questions: Array<{
    question: string;
    options: Array<{ imgPath: string; correct: boolean }>;
  }>;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const gameState = useSelector<AppState, any>(
    state => state.analogueClockGame
  );
  const gameResults = useSelector<AppState, any>(state => state.game.results);

  const handleGameStart = () => {
    dispatch(
      POST_GAME_RESULTS(
        Object.assign({ ...gameResults }, { analogueClockGame: [] })
      )
    );
    dispatch(SET_ANALOGUE_CLOCK_GAME_CURRENT_QUESTION(0));
    dispatch(SET_ANALOGUE_CLOCK_GAME_STARTED());
  };

  const handleAnswerClick = (item: any) => {
    dispatch(SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER(item));
  };

  const getNextQuestion = () => {
    let tempResults = [...gameResults.analogueClockGame];
    tempResults.push({ correct: gameState.selectedAnswer.correct });
    if (gameState.currentQuestion + 1 < questions.length) {
      dispatch(
        POST_GAME_RESULTS(
          Object.assign({ ...gameResults }, { analogueClockGame: tempResults })
        )
      );
      dispatch(SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER(null));
      dispatch(
        SET_ANALOGUE_CLOCK_GAME_CURRENT_QUESTION(gameState.currentQuestion + 1)
      );
    }
  };

  const handleGameEnd = () => {
    let tempResults = [...gameResults.analogueClockGame];
    tempResults.push({ correct: gameState.selectedAnswer.correct });
    dispatch(
      POST_GAME_RESULTS(
        Object.assign({ ...gameResults }, { analogueClockGame: tempResults })
      )
    );
    dispatch(SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER(null));
    dispatch(SET_ANALOGUE_CLOCK_GAME_COMPLETED());
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <GameHeading heading="9. Kella tundmine" />
        <GameDescription>
          Selles mängus tuleb sul vajutada kella peale, mis näitab õiget aega
        </GameDescription>
        <GameContent>
          {gameState.gameStarted ? (
            <React.Fragment>
              <div className="analogue-clock-game-wrapper">
                <GameQuestionCounter
                  totalAmountOfQuestions={questions.length}
                  currentQuestion={gameState.currentQuestion + 1}
                />
                <div className="analogue-clock-game-items">
                  {questions[gameState.currentQuestion].options.map(item => {
                    return (
                      <img
                        key={item.imgPath}
                        onClick={() => handleAnswerClick(item)}
                        style={{
                          borderRadius: "8px",
                          border:
                            gameState?.selectedAnswer?.imgPath === item.imgPath
                              ? "2px solid rgba(1,24,5,0.2)"
                              : ""
                        }}
                        src={
                          process.env.PUBLIC_URL +
                          "/images/clock/" +
                          item.imgPath
                        }
                        alt={item.imgPath}
                        className="analogue-clock-game-item"
                      />
                    );
                  })}
                </div>
                <div className="analogue-clock-game-question">
                  <div className="analogue-clock-game-question-text">
                    {questions[gameState.currentQuestion].question}
                  </div>
                </div>
              </div>
              {gameState.selectedAnswer !== null &&
              gameState.currentQuestion + 1 < questions.length ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem"
                  }}
                >
                  <NextQuestionBtn handleClick={getNextQuestion} />
                </div>
              ) : (
                ""
              )}
              {gameState.currentQuestion + 1 === questions.length &&
              gameState.selectedAnswer !== null ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3rem"
                  }}
                >
                  <EndGameBtn handleClick={handleGameEnd} />
                </div>
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
    </React.Fragment>
  );
};

export default AnalogueClockGame;
