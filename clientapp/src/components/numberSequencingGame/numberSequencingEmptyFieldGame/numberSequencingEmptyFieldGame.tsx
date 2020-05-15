import React, { useEffect, useState } from "react";
import { NextQuestionBtn } from "../../common/gameButtons";
import DraggableSequenceNumber from "./draggableSequenceNumber";
import NumberSequencingGameDropzone from "./numberSequencingGameDropzone";
import GameQuestionCounter from "../../common/gameQuestionCounter";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { POST_GAME_RESULTS } from "../../game/actions/gameActions";
import {shuffleArray} from "../../common/helpers/arrayHelpers";

const NumberSequencingEmptyFieldGame: React.FC<{
  questions: Array<{ availableNumbers: number[]; originalSequence: number[] }>;
  handleNextAssignment: any;
}> = ({ questions, handleNextAssignment }) => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [assignmentCompleted, setAssignmentCompleted] = useState<boolean>(
    false
  );
  const [dropSlots, setDropSlots] = useState<Array<any>>([]);
  const [numberOptions, setNumberOptions] = useState<Array<number>>([]);
  const gameResults = useSelector<AppState, any>(state => state.game.results);
  useEffect(() => {
    let options: Array<number> = [];
    let dropArr: Array<number | null> = [];
    questions[currentQuestion].originalSequence.forEach(number => {
      if (!questions[currentQuestion].availableNumbers.includes(number)) {
        options.push(number);
        dropArr.push(0);
      } else {
        dropArr.push(number);
      }
    });

    const shuffledOptions = shuffleArray(options);
    setNumberOptions(shuffledOptions);
    setDropSlots(dropArr);
  }, [questions, currentQuestion]);

  const handleDrop = (newSlots: any[], newOptions: any[]) => {
    setDropSlots(newSlots);
    setNumberOptions(newOptions);
  };

  const handleNextQuestion = () => {
    let resultsArr: Array<any> = [];
    dropSlots.forEach((dropSlot: number, idx: number) => {
      if (dropSlot === questions[currentQuestion].originalSequence[idx]) {
        resultsArr.push({
          correct: true,
          expected: questions[currentQuestion].originalSequence[idx],
          answer: dropSlot
        });
      } else {
        resultsArr.push({
          correct: false,
          expected: questions[currentQuestion].originalSequence[idx],
          answer: dropSlot
        });
      }
    });
    let numberSequencingGameResults = [...gameResults.numberSequencingGame];
    numberSequencingGameResults.push(resultsArr);
    dispatch(
      POST_GAME_RESULTS(
        Object.assign(
          { ...gameResults },
          {
            numberSequencingGame: numberSequencingGameResults
          }
        )
      )
    );
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(c => c + 1);
    } else {
      handleNextAssignment();
    }
  };
  return (
    <div className="number-sequencing-game-numArray-container">
      <GameQuestionCounter
        totalAmountOfQuestions={questions.length}
        currentQuestion={currentQuestion + 1}
      />
      <div className="number-sequencing-game-numArray">
        {!assignmentCompleted
          ? dropSlots.map((dropSlot, idx) => {
              if (
                !questions[currentQuestion].availableNumbers.includes(dropSlot)
              ) {
                return (
                  <NumberSequencingGameDropzone
                    key={Math.random() + dropSlot + idx}
                    expectedDrop={numberOptions[idx]}
                    value={dropSlot}
                    sequenceIdx={idx}
                    dropArray={dropSlots}
                    handleDrop={handleDrop}
                    availableOptions={numberOptions}
                  />
                );
              } else {
                return (
                  <div
                    key={"drop" + idx}
                    className="number-sequencing-game-number-field number-sequencing-game-static-number"
                  >
                    {dropSlot}
                  </div>
                );
              }
            })
          : ""}
      </div>
      <div className="number-sequencing-game-numArray">
        {numberOptions.map(option => {
          return (
            <DraggableSequenceNumber
              key={Math.floor(Math.random() * 100) + option + Math.random()}
              value={option}
            />
          );
        })}
      </div>
      {!assignmentCompleted &&
      numberOptions.length === 0 &&
      currentQuestion + 1 !== questions.length ? (
        <NextQuestionBtn handleClick={handleNextQuestion} />
      ) : (
        ""
      )}
      {currentQuestion + 1 === questions.length &&
      numberOptions.length === 0 ? (
        <Button color="success" style={{fontWeight: "bold", fontSize: "2rem"}} size="lg" onClick={handleNextQuestion}>
          LÕPETA ÜLESANNE
        </Button>

      ) : (
        ""
      )}
      {assignmentCompleted && currentQuestion + 1 === questions.length ? (
        <Button color="success" size="lg" onClick={handleNextAssignment}>
          Järgmine ülesanne
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default NumberSequencingEmptyFieldGame;
