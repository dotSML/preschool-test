import React, { ReactNode } from "react";

const DragLayer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default DragLayer;
