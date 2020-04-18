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

        if (!_.isEmpty(ogSlotItem.droppedItem)) {
          let dragItemClone = { ...dragItem };
          let slotItemClone = { ...ogSlotItem };
          slotArrTemp[slotIdx].droppedItem = dragItem.droppedItem;
          slotArrTemp[dragItemClone.droppedItem.slotIdx].droppedItem =
            slotItemClone.droppedItem;
          handleSlotChange(slotArrTemp, null);
        } else {
          let dragItemClone = { ...dragItem };
          let slotItemClone = { ...ogSlotItem };
          slotArrTemp[dragItemClone.droppedItem.slotIdx].droppedItem =
            slotItemClone.droppedItem;

          slotArrTemp[slotIdx].droppedItem = dragItemClone.droppedItem;
          slotArrTemp[slotIdx].droppedItem.slotIdx = slotIdx;
          handleSlotChange(slotArrTemp, null);
        }
      }
    },

    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div ref={drop} className="weekday-game-dropzone">
      <span
        style={{
          fontWeight: "bold",
          marginRight: "0.5rem",
          fontSize: "1.2rem"
        }}
      >
        {dropzone.order + 1}
      </span>
      {!_.isEmpty(dropzone.droppedItem) ? (
        <DraggableWeekday
          style={{
            border: "none",
            borderRadius: "8px",
            padding: "0.5rem",
            backgroundColor: "#0275d8",
            fontSize: "1.2rem",
            color: "white"
          }}
          weekday={dropzone.droppedItem.weekday}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default WeekdayDropZone;
