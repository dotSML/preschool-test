import React from "react";
import { Button } from "reactstrap";

const StartGameBtn: React.FC<{
  handleGameStart: any;
  gameCompleted?: boolean;
}> = ({ handleGameStart, gameCompleted }) => {
  return (
    <Button
      block
      color="success"
      size="lg"
      style={{ fontSize: "2rem", textTransform: "uppercase" }}
      onClick={() => handleGameStart()}
    >
      {!gameCompleted ? "Alusta mängu" : "Mängi uuesti"}
    </Button>
  );
};

export default StartGameBtn;
