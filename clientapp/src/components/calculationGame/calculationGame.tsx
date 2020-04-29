import React, { useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { shuffleArray } from "../common/helpers/arrayHelpers";
import StartGameBtn from "../common/startGameBtn";
import { NextQuestionBtn } from "../common/gameButtons";
import GameQuestionCounter from "../common/gameQuestionCounter";
import { AppState } from "../../store/store";
import { CalculationGameReducerStateType } from "./reducers/calculationGameReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CALCULATION_GAME_CHOSEN_ANSWER,
  SET_CALCULATION_GAME_COMPLETED,
  SET_CALCULATION_GAME_CURRENT_QUESTION,
  SET_CALCULATION_GAME_STARTED
} from "./actions/calculationGameActions";
import { Button } from "reactstrap";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";

const CalculationGame: React.FC<{
  questions: Array<{ task: string; answer: number }>;
}> = ({ questions }) => {
  const gameState = useSelector<AppState, CalculationGameReducerStateType>(
    state => state.calculationGame
  );
  const gameResults = useSelector<AppState, any>(state => state.game.results);
  const dispatch = useDispatch();
  const [questionOptions, setOptions] = useState<Array<number>>([]);

  const getRandomOptionsWithCorrect = (
    correctAns: number,
    amountOfOptions: number
  ) => {
    let optionsArr: Array<number> = [];
    optionsArr.push(correctAns);
    for (let i = 0; i < amountOfOptions - 1; i++) {
      let random = getUniqueRandom(optionsArr);
      optionsArr.push(random);
    }

    return shuffleArray(optionsArr);
  };

  const postResults = (selectedOption: number, expected: number) => {
    let resultsArr = [...gameResults.calculationGame];
    resultsArr.push({
      correct: expected === selectedOption,
      expected: expected,
      selected: selectedOption
    });
    dispatch(
      POST_GAME_RESULTS(
        Object.assign({ ...gameResults }, { calculationGame: resultsArr })
      )
    );
  };

  const nextQuestion = () => {
    postResults(
      gameState.chosenAnswer,
      questions[gameState.currentQuestion].answer
    );
    if (gameState.currentQuestion + 1 < questions.length) {
      dispatch(SET_CALCULATION_GAME_CHOSEN_ANSWER(0));
      dispatch(
        SET_CALCULATION_GAME_CURRENT_QUESTION(gameState.currentQuestion + 1)
      );
    } else {
      dispatch(SET_CALCULATION_GAME_COMPLETED());
    }
  };

  // @ts-ignore
  const getUniqueRandom = (arr: Array<number>) => {
    let random = Math.floor(Math.random() * 14);
    if (!arr.includes(random) && random !== 0) {
      return random;
    }
    return getUniqueRandom(arr);
  };

  const handleOptionClick = (optionVal: number) => {
    dispatch(SET_CALCULATION_GAME_CHOSEN_ANSWER(optionVal));
  };

  const handleStartGame = () => {
    dispatch(SET_CALCULATION_GAME_CURRENT_QUESTION(0));
    dispatch(SET_CALCULATION_GAME_STARTED());
  };

  useEffect(() => {
    setOptions(
      getRandomOptionsWithCorrect(
        questions[gameState.currentQuestion].answer,
        9
      )
    );
  }, [gameState.currentQuestion]);

  return (
    <React.Fragment>
      <GameHeading heading="7. Arvutamine" />
      <GameDescription>
        Selles mängus tuleb sul leida õige vastus ja vajutada selle peale
      </GameDescription>
      <GameContent>
        {gameState.gameStarted ? (
          <React.Fragment>
            <GameQuestionCounter
              totalAmountOfQuestions={questions.length}
              currentQuestion={gameState.currentQuestion + 1}
            />
            <div className="calculation-game-options">
              {questionOptions.map(opt => {
                return (
                  <div
                    key={opt + Math.random()}
                    className="calculation-game-option"
                    onClick={() => handleOptionClick(opt)}
                  >
                    <div className="calculation-game-option-image">IMG</div>
                    {opt}
                  </div>
                );
              })}
            </div>
            <div className="calculation-game-task-wrapper">
              <div className="calculation-game-task">
                {questions[gameState.currentQuestion].task +
                  " = " +
                  (gameState.chosenAnswer !== 0 ? gameState.chosenAnswer : "?")}
              </div>
            </div>
            {gameState.chosenAnswer !== 0 &&
            gameState.currentQuestion + 1 < questions.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem"
                }}
              >
                <NextQuestionBtn handleClick={nextQuestion} />
              </div>
            ) : (
              ""
            )}
            {gameState.currentQuestion + 1 === questions.length &&
            gameState.chosenAnswer !== 0 ? (
              <Button
                color="success"
                size="lg"
                style={{ fontSize: "2rem" }}
                onClick={nextQuestion}
              >
                LÕPETA ÜLESANNE
              </Button>
            ) : (
              ""
            )}
          </React.Fragment>
        ) : (
          <StartGameBtn
            handleGameStart={handleStartGame}
            gameCompleted={gameState.gameCompleted}
          />
        )}
      </GameContent>
    </React.Fragment>
  );
};

export default CalculationGame;
