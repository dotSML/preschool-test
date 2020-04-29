import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableWordType } from "../common/types/dndTypes";

type SeasonType = {
  name: string;
  label: string;
  months: Array<string>;
};

const SeasonDropContainer: React.FC<{
  season: SeasonType;
  getNextMonth: Function;
  handleDrop: Function;
}> = ({ season, getNextMonth, handleDrop }) => {
  const [droppedMonths, setDroppedMonths] = useState<Array<string>>([]);
  const [dropProps, drop] = useDrop({
    accept: DraggableWordType.MONTH,
    drop: (item: any, monitor) => {
      let dropArr = [...droppedMonths];
      dropArr.push(item.name);
      setDroppedMonths(dropArr);
      handleDrop(season, item.name);
      getNextMonth();
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div ref={drop} className="months-game-season-drop-container">
      <span
        style={{
          display: "flex",
          width: "100%",
          padding: "0.5rem",
          justifyContent: "center",
          textTransform: "uppercase",
          fontWeight: "bold"
        }}
      >
        {season.label}
      </span>
      <div className="months-game-season-drop-container-dropped-months">
        {droppedMonths?.map(month => {
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={month}
            >
              {month}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonDropContainer;
