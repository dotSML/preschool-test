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
  const [droppedWeekdays, setDroppedWeekdays] = useState<
    Array<WeekdaysGameWeekdayType>
  >([]);
  const [questionsArr, setQuestionsArr] = useState<WeekdaysGameQuestionsType>(
    []
  );
  const [dropSlots, setDropSlots] = useState<Array<any>>([]);
  const [dropzones, setDropzones] = useState<Array<any>>([]);

  useEffect(() => {
    if (questions.length !== 0) {
      let questionsTempArr = [...questions];
      let dropArrTemp: any[] = [];
      setQuestionsArr(shuffleArray(questionsTempArr));
      if (dropzones.length === 0) {
        questions.forEach(item => {
          dropArrTemp.push({ ...item, droppedItem: {} });
        });
        setDropSlots(dropArrTemp);
      }
    }
  }, [questions]);

  const handleDrop = (item: any) => {
    let newQuestionArr = questionsArr.filter(question => {
      return question.label !== item.weekday.label;
    });

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

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"5. NÄDALAPÄEVAD"} />
      <GameDescription>
        Selles mängus pead lohistama päevade nimetused õigesse järjekorda
      </GameDescription>
      <GameContent>
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
          {questionsArr.length
            ? questionsArr.map(weekday => {
                return (
                  <DraggableWeekday
                    key={weekday.label + weekday.order}
                    weekday={weekday}
                  />
                );
              })
            : ""}
        </div>
      </GameContent>
    </DndProvider>
  );
};

export default WeekdaysGame;
