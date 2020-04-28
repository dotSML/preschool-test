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

  const handleGameStart = () => {
    dispatch(SET_WEEKDAYS_GAME_CURRENT_QUESTION(0));
    dispatch(SET_WEEKDAYS_GAME_STARTED());
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
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"5. NÄDALAPÄEVAD"} />
      <GameDescription>
        Selles mängus pead lohistama päevade nimetused õigesse järjekorda
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
                  style={{ fontSize: "2rem" }}
                  onClick={handleGameCompletion}
                >
                  Olen oma vastuses kindel!
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
