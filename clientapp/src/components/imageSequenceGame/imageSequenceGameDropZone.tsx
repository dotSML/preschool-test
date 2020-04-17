import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../common/types/dndTypes";

const ImageSequenceGameDropZone: React.FC<{
  droppedImage?: any;
  sequenceIdx: number;
  reArrangeSlots: any;
}> = ({ droppedImage, sequenceIdx, reArrangeSlots }) => {
  const [droppedItem, setDroppedItem] = useState<any | null>(null);
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.ORDER,
    drop: (item: any, monitor) => {
      console.log(`Dropped ${item.idx}, required - ${sequenceIdx}`);
      reArrangeSlots(item.ogIdx, sequenceIdx);
    },
    canDrop: (item: any) => {
      return true;
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  useEffect(() => {
    setDroppedItem(droppedImage);
  }, [droppedImage]);

  return (
    <div ref={drop} className="image-sequence-game-image-drop-zone">
      {droppedItem || ""}
    </div>
  );
};

export default ImageSequenceGameDropZone;
