import React, { useState } from "react";
import { useDrop } from "react-dnd";
import _ from "lodash";
import { DraggableWordType } from "../common/types/dndTypes";
import DraggableWeekday from "./draggableWeekday";

const WeekdayDropZone: React.FC<{
  dropzone: any;
  handleDrop: Function;
  slotIdx: number;
  slotArr: Array<any>;
  handleSlotChange: any;
}> = ({ dropzone, handleDrop, slotArr, slotIdx, handleSlotChange }) => {
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.WEEKDAY,
    drop: (item: any, monitor) => {
      console.log(slotArr);
      console.log(item);
      let alreadyDropped = false;
      let currentItem: any = {};
      slotArr.forEach(slot => {
        if (!_.isEmpty(slot.droppedItem)) {
          if (slot.droppedItem?.weekday?.label === item?.weekday?.label) {
            alreadyDropped = true;
            currentItem = slot;
          }
        }
      });

      if (!alreadyDropped) {
        let newSlotArr = [...slotArr];
        newSlotArr[slotIdx].droppedItem = item;
        newSlotArr[slotIdx].droppedItem.slotIdx = slotIdx;
        handleSlotChange(newSlotArr, item);
      } else {
        let slotArrTemp = [...slotArr];
        let ogSlotItem = slotArrTemp[slotIdx];
        let dragItem = slotArrTemp[currentItem.droppedItem.slotIdx];

        slotArrTemp[slotIdx] = dragItem;
        slotArrTemp[currentItem.droppedItem.slotIdx] = ogSlotItem;
        ogSlotItem.droppedItem.slotIdx = currentItem.droppedItem.slotIdx;
        dragItem.droppedItem.slotIdx = slotIdx;

        handleSlotChange(slotArrTemp, item);
      }
    },

    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div ref={drop} className="weekday-game-dropzone">
      {dropzone.order}
      {!_.isEmpty(dropzone.droppedItem) ? (
        <DraggableWeekday
          style={{ border: "none" }}
          weekday={dropzone.droppedItem.weekday}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default WeekdayDropZone;
