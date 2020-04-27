import React, { useEffect, useState } from "react";
import { NextQuestionBtn } from "../../common/gameButtons";
import DraggableSequenceNumber from "./draggableSequenceNumber";
import NumberSequencingGameDropzone from "./numberSequencingGameDropzone";
import GameQuestionCounter from "../../common/gameQuestionCounter";

const NumberSequencingEmptyFieldGame: React.FC<{
  questions: Array<{ availableNumbers: number[]; originalSequence: number[] }>;
}> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [assignmentCompleted, setAssignmentCompleted] = useState<boolean>(
    false
  );
  const [dropSlots, setDropSlots] = useState<Array<any>>([]);
  const [numberOptions, setNumberOptions] = useState<Array<number>>([]);

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

    setNumberOptions(options);
    setDropSlots(dropArr);
  }, [questions, currentQuestion]);

  const handleDrop = (newSlots: any[], newOptions: any[]) => {
    setDropSlots(newSlots);
    setNumberOptions(newOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(c => c + 1);
    } else {
      setAssignmentCompleted(true);
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
      {!assignmentCompleted ? (
        <NextQuestionBtn handleClick={handleNextQuestion} />
      ) : (
        "ASSIGNMENT OVER"
      )}
    </div>
  );
};

export default NumberSequencingEmptyFieldGame;
