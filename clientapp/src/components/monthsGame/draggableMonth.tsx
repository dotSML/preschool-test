import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
// @ts-ignore
import Preview from "react-dnd-preview";
import { DraggableWordType } from "../common/types/dndTypes";

const DraggableMonth: React.FC<{ month: string }> = ({ month }) => {
  const [dragProps, drag] = useDrag({
    item: { type: DraggableWordType.MONTH, name: month },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  useEffect(() => {
    if (dragProps.isDragging) {
      let audio = new Audio(
        process.env.PUBLIC_URL + "/audio/task3/task3-tutorial.m4a"
      );
      audio.play();
    }
  }, [dragProps.isDragging]);

  const GeneratePreview = ({ itemType, item, style }: any) => {
    return (
      <div className="months-game-draggable-month" style={style}>
        {item.name}
      </div>
    );
  };

  return (
    <div>
      <div className="months-game-draggable-month" ref={drag}>
        {month}
      </div>
      <Preview generator={(props: any) => GeneratePreview(props)} />
    </div>
  );
};

export default DraggableMonth;
