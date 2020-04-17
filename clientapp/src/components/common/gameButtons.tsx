import React from "react";
import { Button } from "reactstrap";

export const NextAssignmentBtn: React.FC<{
  label?: string;
  handleClick: Function;
}> = ({ label = "JÄRGMINE ÜLESANNE", handleClick }) => {
  return (
    <Button
      color="success"
      size="lg"
      onClick={() => handleClick()}
      style={{ fontSize: "2rem" }}
    >
      {label}
    </Button>
  );
};

export const NextQuestionBtn: React.FC<{
  label?: string;
  handleClick: Function;
}> = ({ label = "JÄRGMINE KÜSIMUS", handleClick }) => {
  return (
    <Button
      color="success"
      size="lg"
      onClick={() => handleClick()}
      style={{ fontSize: "2rem" }}
    >
      {label}
    </Button>
  );
};
