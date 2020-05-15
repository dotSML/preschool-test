import React, { useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import StartGameBtn from "../common/startGameBtn";
import NumberSequencingEmptyFieldGame from "./numberSequencingEmptyFieldGame/numberSequencingEmptyFieldGame";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import { DndProvider } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import {
  SET_NUMBER_SEQUENCING_GAME_COMPLETED,
  SET_NUMBER_SEQUENCING_GAME_CURRENT_ASSIGNMENT,
  SET_NUMBER_SEQUENCING_GAME_STARTED
} from "./actions/numberSequencingGameActions";
import AudioBtn from "../common/audioBtn";
import {SET_GAME_CURRENT_GAME} from "../game/actions/gameActions";

const NumberSequencingGame: React.FC<{ questions: Array<any> }> = ({
  questions
}) => {
  const dispatch = useDispatch();
  const currentGame = useSelector<AppState, number>(state => state.game.currentGame);
  useEffect(() => {
    handleGameStart();
  }, [])
  const gameState = useSelector<AppState, any>(
    state => state.numberSequencingGame
  );

  const handleGameStart = () => {
    dispatch(SET_NUMBER_SEQUENCING_GAME_STARTED());
  };

  const handleNextAssignment = () => {
    if (gameState.currentAssignment + 1 < gameAssignments.length) {
      dispatch(
        SET_NUMBER_SEQUENCING_GAME_CURRENT_ASSIGNMENT(
          gameState.currentAssignment + 1
        )
      );
    } else {
      dispatch(SET_NUMBER_SEQUENCING_GAME_COMPLETED());
      dispatch(SET_GAME_CURRENT_GAME(currentGame + 1));
    }
  };

  const gameAssignments = [
    {
      name: "emptyField",
      component: (
        <NumberSequencingEmptyFieldGame
          questions={questions[0]}
          handleNextAssignment={handleNextAssignment}
        />
      )
    }
  ];

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading="6. Arvude Järjestamine" />
      <GameDescription>
        Moodusta arvujada, kus numbrid on väiksemast suuremani või suuremast
        väiksemani
        <AudioBtn audioFile="/task6/task6-tutorial.m4a" />
      </GameDescription>
      <GameContent>
        {gameState.gameStarted ? (
          <div>
            {gameAssignments[gameState.currentAssignment].component}
          </div>
        ) : (
          ""
        )}
      </GameContent>
    </DndProvider>
  );
};
export default NumberSequencingGame;
