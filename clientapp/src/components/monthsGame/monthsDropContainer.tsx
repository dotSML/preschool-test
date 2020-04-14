import React from "react";

const MonthsDropContainer = () => {
  return (
    <div className="months-game-drop-container">
      <img
        src={process.env.PUBLIC_URL + "/images/monthsGame/seasons.svg"}
        className="months-game-drop-image"
        alt="seasons"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "25%",
          backgroundColor: "rgba(0, 0, 0, 0.15)"
        }}
      >
        DROPPPPPP
      </div>
    </div>
  );
};

export default MonthsDropContainer;
