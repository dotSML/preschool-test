import React from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../../common/types/dndTypes";
import DraggableSequenceNumber from "./draggableSequenceNumber";

const NumberSequencingGameDropzone: React.FC<{
  expectedDrop: number;
  value: number;
  handleDrop: (newArr: any[], newOptions: any[]) => void;
  sequenceIdx: number;
  dropArray: any[];
  availableOptions: any[];
}> = ({
  expectedDrop,
  value,
  handleDrop,
  sequenceIdx,
  dropArray,
  availableOptions
}) => {
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.NUMBER,
    drop: (item: any) => {
      let dropArr = [...dropArray];
      let optionArr = [...availableOptions];

      if (dropArr[sequenceIdx]) {
        let dragIdx = dropArr.indexOf(item.value);
        dropArr[dragIdx] = dropArr.splice(sequenceIdx, 1, dropArr[dragIdx])[0];
        handleDrop(dropArr, optionArr);
      } else {
        dropArr[sequenceIdx] = item.value;
        if (optionArr.includes(item.value)) {
          optionArr = optionArr.filter(x => x !== item.value);
        } else {
          dropArr[sequenceIdx] = item.value;
          dropArr[item.dropIdx] = 0;
          console.log(dropArr);
        }
        handleDrop(dropArr, optionArr);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className={
        value
          ? "number-sequencing-game-number-field " +
            "number-sequencing-game-number-dropped"
          : "number-sequencing-game-number-field"
      }
    >
      {value ? (
        <DraggableSequenceNumber droppedIdx={sequenceIdx} value={value} />
      ) : (
        ""
      )}
    </div>
  );
};

export default NumberSequencingGameDropzone;
