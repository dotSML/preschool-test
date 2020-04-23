import React from "react";

const GameStatus: React.FC<{
  assignmentNo: number;
  totalNumberOfAssignments: number;
}> = ({ assignmentNo, totalNumberOfAssignments }) => {
  return (
    <div className="game-status-wrapper">
      <div className="game-status-current-assignment">
        ÜLESANNE {assignmentNo}/{totalNumberOfAssignments}
      </div>
    </div>
  );
};

export default GameStatus;
