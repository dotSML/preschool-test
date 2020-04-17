import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { DraggableWordType } from "../common/types/dndTypes";
import { WeekdaysGameWeekdayType } from "./weekdaysGame";
//@ts-ignore
import Preview from "react-dnd-preview";

const DraggableWeekday: React.FC<{
  weekday: WeekdaysGameWeekdayType;
}> = ({ weekday }) => {
  const [dragProps, drag] = useDrag({
    item: { type: DraggableWordType.WEEKDAY, label: weekday.label },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  useEffect(() => {
    console.log(weekday, "WEEKDAY CHANGE");
  }, [weekday]);

  const GeneratePreview = ({ itemType, item, style }: any) => {
    return (
      <div className="weekday-game-draggable-weekday" style={style}>
        {item.label}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        style={{ opacity: dragProps.isDragging ? 0.5 : 1 }}
        className="weekday-game-draggable-weekday"
        ref={drag}
      >
        {weekday.label}
      </div>
      <Preview generator={(props: any) => GeneratePreview(props)} />
    </React.Fragment>
  );
};

export default DraggableWeekday;
