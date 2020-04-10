import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "./draggableWord";

type ImagePropType = {
  word: string;
  image: string;
};

const DropTargetImage: React.FC<{ imgProp: ImagePropType }> = ({ imgProp }) => {
  const [isHovering, setHovering] = useState<boolean>(false);
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.WORD,
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
        justifyContent: "center",
        backgroundColor: isHovering ? "red" : "white"
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
