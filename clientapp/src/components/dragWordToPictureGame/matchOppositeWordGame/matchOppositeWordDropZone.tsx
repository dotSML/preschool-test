import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../draggableWord";
import { MatchOppositeWordsGameQuestionType } from "./matchOppositeWordsGameTypes";

const MatchOppositeWordDropZone: React.FC<{
  question: MatchOppositeWordsGameQuestionType;
  handleDrop: (droppedItem: string, expected: string) => void;
}> = ({ question, handleDrop }) => {
  const [droppedItem, setDroppedItem] = useState<string | null>(null);

  useEffect(() => {
    setDroppedItem(null);
  }, [question]);

  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.WORD,
    drop: (item: any, monitor) => {
      console.log(item);
      setDroppedItem(item.word.word);
      handleDrop(item.word.word, question.match);
    },
    canDrop: (item: any) => {
      return droppedItem === null;
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
        {question.word}
      </div>
      <div
        className="match-opposite-words-drop-zone-box"
        style={{ fontSize: "3rem", backgroundColor: "green" }}
      >
        {droppedItem}
      </div>
    </div>
  );
};

export default MatchOppositeWordDropZone;
