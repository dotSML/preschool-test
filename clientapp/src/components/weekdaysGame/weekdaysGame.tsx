import React, { useEffect, useState } from "react";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { DndProvider } from "react-dnd";
import DraggableWeekday from "./draggableWeekday";
import WeekdayDropZone from "./weekdayDropZone";
import { shuffleArray } from "../common/helpers/arrayHelpers";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import StartGameBtn from "../common/startGameBtn";
import {
  SET_WEEKDAYS_GAME_COMPLETED,
  SET_WEEKDAYS_GAME_CURRENT_QUESTION,
  SET_WEEKDAYS_GAME_STARTED
} from "./actions/weekdaysGameActions";
import { Button } from "reactstrap";
import AudioBtn from "../common/audioBtn";
import {SET_GAME_CURRENT_GAME} from "../game/actions/gameActions";

type WeekdaysGameQuestionsType = Array<{
  label: string;
  audioPath: string;
  order: number;
}>;

export type WeekdaysGameWeekdayType = {
  label: string;
  audioPath: string;
  order: number;
};

const WeekdaysGame: React.FC<{ questions: WeekdaysGameQuestionsType }> = ({
  questions
}) => {
  const [questionsArr, setQuestionsArr] = useState<WeekdaysGameQuestionsType>(
    []
  );
  const dispatch = useDispatch();
  const gameState = useSelector<AppState, any>(state => state.weekdaysGame);
  const [dropSlots, setDropSlots] = useState<Array<any>>([]);
  const currentGame = useSelector<AppState, number>(state => state.game.currentGame);
  const handleGameStart = () => {
    dispatch(SET_WEEKDAYS_GAME_CURRENT_QUESTION(0));
    dispatch(SET_WEEKDAYS_GAME_STARTED());
  };


  useEffect(() => {
    if (questions.length !== 0) {
      let questionsTempArr = [...questions];
      let dropArrTemp: any[] = [];
      setQuestionsArr(shuffleArray(questionsTempArr));
      if (dropSlots.length === 0) {
        questions.forEach(item => {
          dropArrTemp.push({ ...item, droppedItem: {} });
        });
        setDropSlots(dropArrTemp);
      }
      handleGameStart();
    }
  }, [questions]);

  const handleDrop = (item: any) => {
    console.log("DROP");
    let newQuestionArr = questionsArr.filter(question => {
      return question.label !== item.weekday.label;
    });

    console.log(newQuestionArr);
    if (newQuestionArr.length === 0) {
      console.log("OVER");
    }

    setQuestionsArr(newQuestionArr);
  };



  const handleSlotArrChange = (value: Array<any>, droppedItem: any) => {
    setDropSlots(value);
    let newQuestionsArrTemp = [...questionsArr];
    if (droppedItem) {
      newQuestionsArrTemp = newQuestionsArrTemp.filter(q => {
        return q.label !== droppedItem.weekday.label;
      });
    }

    setQuestionsArr(newQuestionsArrTemp);
  };

  const handleGameCompletion = () => {
    dispatch(SET_WEEKDAYS_GAME_COMPLETED());
    dispatch(SET_GAME_CURRENT_GAME(currentGame + 1));
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"5. NÄDALAPÄEVAD"} />
      <GameDescription>
        Järjesta nädalapäevad, alustades esmaspäevast{" "}
        <AudioBtn audioFile="/task5/task5-tutorial.m4a" />
      </GameDescription>
      <GameContent>
        {gameState.gameStarted ? (
          <React.Fragment>
            <div className="weekday-game-dropzones-container">
              {dropSlots.map((dropzone, idx) => {
                return (
                  <WeekdayDropZone
                    slotIdx={idx}
                    handleSlotChange={handleSlotArrChange}
                    slotArr={dropSlots}
                    key={`${dropzone.label}${dropzone.order}`}
                    handleDrop={handleDrop}
                    dropzone={dropzone}
                  />
                );
              })}
            </div>
            <div className="weekday-game-weekday-container">
              {questionsArr.length ? (
                questionsArr.map(weekday => {
                  return (
                    <DraggableWeekday
                      key={weekday.label + weekday.order}
                      weekday={weekday}
                    />
                  );
                })
              ) : (
                <Button
                  color="success"
                  size="lg"
                  style={{ fontSize: "2rem", fontWeight: "bold" }}
                  onClick={handleGameCompletion}
                >
                  EDASI!
                </Button>
              )}
            </div>
          </React.Fragment>
        ) : (
          <StartGameBtn
            handleGameStart={handleGameStart}
            gameCompleted={gameState.gameCompleted}
          />
        )}
      </GameContent>
    </DndProvider>
  );
};

export default WeekdaysGame;
