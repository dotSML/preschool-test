import React from "react";
import { Button } from "reactstrap";
import GameCompleted from "./gameCompleted";

const StartGameBtn: React.FC<{
  handleGameStart: any;
  gameCompleted?: boolean;
}> = ({ handleGameStart, gameCompleted }) => {
  return (
    <div className="game-start-btn-wrapper">
      {gameCompleted ? <GameCompleted /> : ""}
      <Button
        block
        color="success"
        size="lg"
        style={{ fontSize: "2rem", textTransform: "uppercase" }}
        onClick={() => handleGameStart()}
      >
        {!gameCompleted ? "Alusta mängu" : "Mängi uuesti"}
      </Button>
    </div>
  );
};

export default StartGameBtn;
