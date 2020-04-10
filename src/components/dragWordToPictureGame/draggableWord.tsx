import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

export const DraggableWordType = {
  WORD: "word"
};

const DraggableWord: React.FC<{ word: string }> = ({ word }) => {
  const [dragProps, drag] = useDrag({
    item: { type: DraggableWordType.WORD },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  useEffect(() => {
    // console.log(dragProps.position);
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: dragProps.isDragging ? 0.5 : 1

        // transform: dragProps.isDragging
        //   ? `translate(${dragProps?.position?.x}px, ${dragProps?.position?.y}px)`
        //   : ""
        // transition: !dragProps.isDragging ? "all .2s ease-out" : ""
      }}
      className="drag-word-to-picture-game-word"
    >
      {word}
    </div>
  );
};

export default DraggableWord;
