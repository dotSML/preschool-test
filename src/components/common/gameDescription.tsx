import React from "react";

const GameDescription: React.FC<{ children: string }> = ({ children }) => {
  return <div className="game-description">{children}</div>;
};

export default GameDescription;
