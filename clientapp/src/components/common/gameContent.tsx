import React, { ReactNode } from "react";

const GameContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div  className="game-main-content">{children}</div>;
};

export default GameContent;
