import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { shuffleArray } from "../common/helpers/arrayHelpers";
import StartGameBtn from "../common/startGameBtn";
import { NextQuestionBtn } from "../common/gameButtons";
import GameQuestionCounter from "../common/gameQuestionCounter";

const CalculationGame: React.FC<{
  questions: Array<{ task: string; answer: number }>;
}> = ({ questions }) => {
  const [questionOptions, setOptions] = useState<Array<number>>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [chosenAnswer, setChosenAnswer] = useState<number>(0);

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

  const nextQuestion = () => {
    setChosenAnswer(0);
    setCurrentQuestion(cq => cq + 1);
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
    setChosenAnswer(optionVal);
  };

  const handleStartGame = () => {
    setCurrentQuestion(0);
    setGameStarted(true);
  };

  // useEffect(() => {
  //   setOptions(
  //     getRandomOptionsWithCorrect(questions[currentQuestion].answer, 9)
  //   );
  // }, []);

  useEffect(() => {
    setOptions(
      getRandomOptionsWithCorrect(questions[currentQuestion].answer, 9)
    );
  }, [currentQuestion]);

  return (
    <React.Fragment>
      <GameHeading heading="7. Arvutamine" />
      <GameDescription>
        Selles mängus tuleb sul leida õige vastus ja vajutada selle peale
      </GameDescription>
      <GameContent>
        {gameStarted ? (
          <React.Fragment>
            <GameQuestionCounter
              totalAmountOfQuestions={questions.length}
              currentQuestion={currentQuestion + 1}
            />
            <div className="calculation-game-options">
              {questionOptions.map(opt => {
                return (
                  <div
                    className="calculation-game-option"
                    onClick={() => handleOptionClick(opt)}
                  >
                    <div className="calculation-game-option-image">IMG</div>
                    {opt}
                  </div>
                );
              })}
            </div>
            <div className="calculation-game-task">
              {questions[currentQuestion].task +
                " = " +
                (chosenAnswer !== 0 ? chosenAnswer : "?")}
            </div>
            {chosenAnswer !== 0 ? (
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
          </React.Fragment>
        ) : (
          <StartGameBtn handleGameStart={handleStartGame} />
        )}
      </GameContent>
    </React.Fragment>
  );
};

export default CalculationGame;
