import React from "react";
import { useDrag } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";
import { ImageSequenceGameQuestionType } from "./imageSequenceGame";
import { DraggableWordType } from "../common/types/dndTypes";

const ImageSequenceGameDraggableImage: React.FC<{
  question: ImageSequenceGameQuestionType;
  sequenceIdx: number;
}> = ({ question, sequenceIdx }) => {
  const [dragProps, drag] = useDrag({
    item: {
      type: DraggableWordType.ORDER,
      idx: question.order,
      ogIdx: sequenceIdx
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  const GeneratePreview = (
    { itemType, item, style }: any,
    question: ImageSequenceGameQuestionType
  ) => {
    return (
      <div className="image-sequence-game-image" style={style}>
        IMAGE
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        ref={drag}
        className="image-sequence-game-image"
        style={{ opacity: dragProps.isDragging ? 0.5 : 1 }}
      >
        {question.image}
        <span style={{ fontSize: "4rem", color: "white" }}>
          {question.order}
        </span>
      </div>
      <Preview generator={props => GeneratePreview(props, question)} />
    </React.Fragment>
  );
};

export default ImageSequenceGameDraggableImage;
