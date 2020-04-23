import React, { useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import StartGameBtn from "../common/startGameBtn";
import NumberSequencingEmptyFieldGame from "./numberSequencingEmptyFieldGame/numberSequencingEmptyFieldGame";
import GameStatus from "../common/gameStatus";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import { DndProvider } from "react-dnd";

const NumberSequencingGame: React.FC<{ questions: Array<any> }> = ({
  questions
}) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const [currentAssignment, setCurrentAssignment] = useState<number>(0);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const gameAssignments = [
    {
      name: "emptyField",
      component: <NumberSequencingEmptyFieldGame questions={questions[0]} />
    }
  ];

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading="6. Arvude Järjestamine" />
      <GameDescription>
        Selles tuleb sul sisestada õige number õigesse lahtrisse, et tekiks kas
        kasvav või kahanev jada.
      </GameDescription>
      <GameContent>
        {gameStarted && !gameCompleted ? (
          <div>
            <GameStatus
              assignmentNo={currentAssignment + 1}
              totalNumberOfAssignments={gameAssignments.length}
            />
            {gameAssignments[currentAssignment].component}
          </div>
        ) : (
          <StartGameBtn
            handleGameStart={handleGameStart}
            gameCompleted={gameCompleted}
          />
        )}
      </GameContent>
    </DndProvider>
  );
};
export default NumberSequencingGame;
