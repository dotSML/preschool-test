import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { DraggableWordType } from "../common/types/dndTypes";
import { WeekdaysGameWeekdayType } from "./weekdaysGame";
//@ts-ignore
import Preview from "react-dnd-preview";

const DraggableWeekday: React.FC<{
  weekday: WeekdaysGameWeekdayType;
  style?: any;
}> = ({ weekday, style }) => {
  const [dragProps, drag] = useDrag({
    item: { type: DraggableWordType.WEEKDAY, weekday: weekday },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  const GeneratePreview = ({ itemType, item, style }: any) => {
    return (
      <div className="weekday-game-draggable-weekday" style={style}>
        {item.weekday.label}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        style={{
          opacity: dragProps.isDragging ? 0 : 1,
          transition: "all .2s"
        }}
        className="weekday-game-draggable-weekday"
        ref={drag}
      >
        {weekday.label}
        <Preview generator={(props: any) => GeneratePreview(props)} />
      </div>
    </React.Fragment>
  );
};

export default DraggableWeekday;
