import React from "react";
import { useDrag } from "react-dnd";
// @ts-ignore
import Preview from "react-dnd-preview";
import { DraggableWordType } from "../draggableWord";

const MatchOppositeWordDraggableWord: React.FC<{ word: any }> = ({ word }) => {
  const [dragProps, drag] = useDrag({
    item: { type: DraggableWordType.WORD, word: word },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  const GeneratePreview = ({ itemType, item, style }: any, word: string) => {
    return (
      <div className="match-opposite-words-draggable-word" style={style}>
        {word}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        ref={drag}
        className="match-opposite-words-draggable-word"
        style={{ opacity: dragProps.isDragging ? 0 : 1, fontSize: "3rem" }}
      >
        {word.word}
      </div>
      <Preview generator={(props: any) => GeneratePreview(props, word.word)} />
    </React.Fragment>
  );
};

export default MatchOppositeWordDraggableWord;
