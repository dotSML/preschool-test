import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../common/types/dndTypes";

const WeekdayDropZone: React.FC<{ dropzone: any }> = ({ dropzone }) => {
  const [droppedItem, setDroppedItem] = useState<any | null>(null);
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.WEEKDAY,
    drop: (item, monitor) => {
      setDroppedItem(item);
    },

    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div ref={drop} className="weekday-game-dropzone">
      {dropzone.order}
      {droppedItem?.label}
    </div>
  );
};

export default WeekdayDropZone;
