import React from "react";
import { useDrag } from "react-dnd";
import { DraggableWordType } from "../../common/types/dndTypes";
//@ts-ignore
import Preview from "react-dnd-preview";

const DraggableSequenceNumber: React.FC<{
  value: number;
  droppedIdx?: number;
}> = ({ value, droppedIdx }) => {
  const [dragProps, drag] = useDrag({
    item: {
      type: DraggableWordType.NUMBER,
      value: value,
      dropIdx: droppedIdx ? droppedIdx : ""
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      position: monitor.getDifferenceFromInitialOffset()
    })
  });

  const GeneratePreview = ({ itemType, item, style }: any) => {
    return (
      <div className="number-sequencing-game-number" style={style}>
        {item.value}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        ref={drag}
        className="number-sequencing-game-number"
        style={{ opacity: dragProps.isDragging ? 0 : 1 }}
      >
        {value}
      </div>
      <Preview generator={GeneratePreview} />
    </React.Fragment>
  );
};

export default DraggableSequenceNumber;
