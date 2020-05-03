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
import StartGameBtn from "../common/startGameBtn";
import AudioBtn from "../common/audioBtn";

export type DragWordToPictureGameQuestionType = {
  answer: string;
  options: Array<{ word: string; image: string }>;
};

const DragWordToPictureGame: React.FC<{ gameConfig: any }> = ({
  gameConfig
}) => {
  const dispatch = useDispatch();

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

  const handleGameEnd = () => {
    dispatch(SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED(true));
    setGameStarted(false);
  };

  const gameFlow = [
    {
      gameComponent: <MatchWordWithPictureGame questions={gameConfig[0]} />
    },
    {
      gameComponent: <MatchOppositeWordGame questions={gameConfig[1]} />
    },
    {
      gameComponent: (
        <PickTheRightWordGame
          questions={gameConfig[2]}
          handleGameEnd={handleGameEnd}
        />
      )
    }
  ];

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"2. Sõnad"} />
      <GameDescription>
        Selles mängus pead lohistama sõna õige pildi peale.
        <AudioBtn audioFile={"/task2/task2-assignment1-tutorial.m4a"} />
      </GameDescription>
      <GameContent>
        {gameStarted && !gameCompleted ? (
          gameFlow[currentAssignment].gameComponent
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

export default DragWordToPictureGame;
