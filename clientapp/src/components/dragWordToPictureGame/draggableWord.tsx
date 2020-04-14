import React, { useEffect, useContext } from "react";
import { useDrag } from "react-dnd";
// @ts-ignore
import Preview from "react-dnd-preview";

export const DraggableWordType = {
  WORD: "word",
  ORDER: "order"
};

const DraggableWord: React.FC<{ word: string }> = ({ word }) => {
  const [dragProps, drag] = useDrag({
    item: { type: DraggableWordType.WORD, word: word },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  const GeneratePreview = ({ itemType, item, style }: any, word: string) => {
    return (
      <div className="drag-word-to-picture-game-word" style={style}>
        {word}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        ref={drag}
        style={{
          opacity: dragProps.isDragging ? 0 : 1
          // transform: dragProps.isDragging
          //   ? `translate(${dragProps?.position?.x}px, ${dragProps?.position?.y}px)`
          //   : ""
          // transition: !dragProps.isDragging ? "all .2s ease-out" : ""
        }}
        className="drag-word-to-picture-game-word"
      >
        {word}
      </div>
      <Preview generator={(props: any) => GeneratePreview(props, word)} />
    </React.Fragment>
  );
};

export default DraggableWord;
