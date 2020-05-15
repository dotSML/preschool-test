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
    canDrop: (item: any) => {
      if (_.isEmpty(slotArr[slotIdx].droppedItem)) {
        return true;
      } else {
        let alreadyDropped = false;
        slotArr.forEach(slot => {
          if (!_.isEmpty(slot.droppedItem)) {
            if (slot.droppedItem?.weekday?.label === item?.weekday?.label) {
              alreadyDropped = true;
            }
          }
        });
        if (alreadyDropped) {
          return true;
        } else {
          return false;
        }
      }
    },
    drop: (item: any, monitor) => {
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
          let cloneDragIdx = dragItemClone.droppedItem.slotIdx;
          let cloneSlotIdx = slotItemClone.droppedItem.slotIdx;
          dragItemClone.droppedItem.slotIdx = cloneSlotIdx;
          slotItemClone.droppedItem.slotIdx = cloneDragIdx;
          slotArrTemp[cloneSlotIdx].droppedItem = dragItemClone.droppedItem;
          slotArrTemp[cloneDragIdx].droppedItem = slotItemClone.droppedItem;

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
            dropped={true}

          weekday={dropzone.droppedItem.weekday}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default WeekdayDropZone;
