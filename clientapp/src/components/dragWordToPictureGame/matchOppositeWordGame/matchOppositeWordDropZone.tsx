import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../draggableWord";

const MatchOppositeWordDropZone: React.FC<{
  img: string;
}> = ({ img }) => {
  const [droppedItem, setDroppedItem] = useState<string | null>(null);

  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.WORD,
    drop: (item: any, monitor) => {
      console.log(item);
      setDroppedItem(item.word.word);

      const droppedItem: any = { ...item };
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div className="match-opposite-words-drop-zone" ref={drop}>
      <div
        className="match-opposite-words-drop-zone-img"
        style={{ fontSize: "3rem" }}
      >
        {img}
      </div>
      <div className="match-opposite-words-drop-zone-box">{droppedItem}</div>
    </div>
  );
};

export default MatchOppositeWordDropZone;
