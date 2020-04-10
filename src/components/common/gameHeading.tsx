import React from "react";

const GameHeading: React.FC<{ heading: string }> = ({ heading }) => {
  return <h1 className="game-heading">{heading}</h1>;
};

export default GameHeading;
