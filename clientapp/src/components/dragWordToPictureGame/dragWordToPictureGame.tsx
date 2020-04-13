import React, { useState } from "react";
import GameHeading from "../common/gameHeading";
import { Button } from "reactstrap";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import DragWordToPictureGameQuestion from "./dragWordToPictureGameQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import {
  SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION,
  SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED
} from "./actions/dragWordToQuestionGameActions";

export type DragWordToPictureGameQuestionType = {
  answer: string;
  options: Array<{ word: string; image: string }>;
};

const DragWordToPictureGame: React.FC<{ gameConfig: any }> = ({
  gameConfig
}) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.currentQuestion
  );
  const currentAssignment = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.currentAssignment
  );
  const gameCompleted = useSelector<AppState, boolean>(
    state => state.dragWordToPictureGame.gameCompleted
  );
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const nextQuestion = () => {
    if (currentQuestion + 1 < gameConfig.length) {
      dispatch(
        SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION(currentQuestion + 1)
      );
    } else {
      setGameStarted(false);
      dispatch(SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED(true));
    }
  };

  const handleGameStart = () => {
    dispatch(SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED(false));
    dispatch(SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION(0));
    setGameStarted(c => !c);
  };

  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend
      },
      {
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition
      }
    ]
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"2. Sõnad"} />
      <GameDescription>
        Selles mängus pead lohistama sõna õige pildi peale.
      </GameDescription>
      <GameContent>
        {gameStarted ? (
          <DragWordToPictureGameQuestion
            questionNo={currentQuestion}
            question={gameConfig[currentQuestion]}
            getNextQuestion={nextQuestion}
            key={currentQuestion}
          />
        ) : (
          <div className="drag-word-to-picture-game-start-btn-wrapper">
            {gameCompleted ? (
              <div
                style={{
                  fontSize: "4rem",
                  textTransform: "uppercase",
                  fontWeight: "bold"
                }}
              >
                Mäng läbi
              </div>
            ) : (
              ""
            )}

            <Button
              block
              color="success"
              size="lg"
              style={{ fontSize: "2rem", textTransform: "uppercase" }}
              onClick={() => handleGameStart()}
            >
              {!gameCompleted ? "Alusta mängu" : "Mängi uuesti"}
            </Button>
          </div>
        )}
      </GameContent>
    </DndProvider>
  );
};

export default DragWordToPictureGame;
