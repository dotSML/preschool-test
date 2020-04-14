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
  RESET_DRAG_WORD_TO_PICTURE_GAME_STATE,
  SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT,
  SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION,
  SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED
} from "./actions/dragWordToQuestionGameActions";
import MatchWordWithPictureGame from "./matchWordWithPictureGame/matchWordWithPictureGame";
import DragWordToPictureGameCompleted from "./dragWordToPictureGameCompleted";
import { HTML5toTouch } from "../common/dnd";
import MatchOppositeWordGame from "./matchOppositeWordGame/matchOppositeWordGame";
import PickTheRightWordGame from "./pickTheRightWordGame/pickTheRightWordGame";

export type DragWordToPictureGameQuestionType = {
  answer: string;
  options: Array<{ word: string; image: string }>;
};

const DragWordToPictureGame: React.FC<{ gameConfig: any }> = ({
  gameConfig
}) => {
  const dispatch = useDispatch();

  const gameFlow = [
    { gameComponent: <MatchWordWithPictureGame questions={gameConfig[0]} /> },
    {
      gameComponent: <MatchOppositeWordGame questions={gameConfig[1]} />
    },
    {
      gameComponent: <PickTheRightWordGame questions={gameConfig[2]} />
    },
    {
      gameComponent: <DragWordToPictureGameCompleted />
    }
  ];

  const currentAssignment = useSelector<AppState, number>(
    state => state.dragWordToPictureGame.currentAssignment
  );
  const gameCompleted = useSelector<AppState, boolean>(
    state => state.dragWordToPictureGame.gameCompleted
  );
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleGameStart = () => {
    dispatch(RESET_DRAG_WORD_TO_PICTURE_GAME_STATE());
    dispatch(SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED(false));
    dispatch(SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION(0));
    setGameStarted(c => !c);
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"2. Sõnad"} />
      <GameDescription>
        Selles mängus pead lohistama sõna õige pildi peale.
      </GameDescription>
      <GameContent>
        {gameStarted ? (
          gameFlow[currentAssignment].gameComponent
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
