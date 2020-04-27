import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../common/types/dndTypes";

type ImagePropType = {
  word: string;
  image: string;
};

const DropTargetImage: React.FC<{
  imgProp: ImagePropType;
  getNextQuestion: any;
  handleAnswer: Function;
}> = ({ imgProp, getNextQuestion, handleAnswer }) => {
  const [isHovering, setHovering] = useState<boolean>(false);
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.WORD,
    drop: (item, monitor) => {
      console.log(item);
      getNextQuestion();
      const droppedItem: any = { ...item };

      if (imgProp.word === droppedItem.word) {
        handleAnswer(true);
      } else {
        handleAnswer(false);
      }
    },
    options: { word: imgProp.word },
    hover: item => handleHover(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const handleHover = (item: any) => {
    if (dropProps.isOver) {
      setHovering(true);
    } else {
      setHovering(false);
    }
  };

  useEffect(() => {
    if (dropProps.isOver) {
      console.log(dropProps.isOver);
    }
  }, [dropProps]);

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "100%",
        padding: "1rem",
        display: "flex",
        opacity: dropProps.isOver ? 0.5 : 1,
        border: dropProps.isOver
          ? "2px dotted black"
          : "2px dotted transparent",
        transition: "all .2s",
        justifyContent: "center"
      }}
    >
      <img
        style={{ opacity: dropProps.isOver ? 0.5 : 1 }}
        className="drag-word-to-picture-game-option"
        src={process.env.PUBLIC_URL + imgProp.image}
        alt={imgProp.word}
      />
    </div>
  );
};

export default DropTargetImage;
