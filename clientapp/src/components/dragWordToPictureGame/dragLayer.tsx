import React, { ReactNode } from "react";
import { useDragLayer } from "react-dnd";
const DragLayer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default DragLayer;
