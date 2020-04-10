import React, { useRef, useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import DraggableWord from "./draggableWord";
import TouchBackend from "react-dnd-touch-backend";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DropTargetImage from "./dropTargetImage";

type DragWordToPictureGameType = {
  answer: string;
  options: Array<{ word: string; image: string }>;
};

const DragWordToPictureGame: React.FC<{ gameConfig: any }> = ({
  gameConfig
}) => {
  const [currentQuestion, setCurrentQuestion] = useState();
  useEffect(() => {
    console.log(gameConfig);
  }, gameConfig);

  const dragNode = useRef();

  const handleTouchMove = (e: any) => {
    console.log(e);
    dragNode.current = e.target;
  };

  const handleDragStart = (e: any) => {
    console.log(e.target);
    e.target.style.backgroundColor = "black";
  };

  const handleDragEnter = (e: any) => {
    console.log("DRAG ENTER");
  };

  return (
    <DndProvider backend={TouchBackend}>
      <GameHeading heading={"Sõnade leidmine"} />
      <GameDescription>
        Selles mängus pead lohistama sõna õige pildi peale.
      </GameDescription>
      <GameContent>
        {gameConfig.map((item: DragWordToPictureGameType) => {
          return (
            <div>
              <div className="drag-word-to-picture-game-options">
                {item.options.map((option, idx) => {
                  return <DropTargetImage key={option.word} imgProp={option} />;
                })}
              </div>
              <div className="drag-word-to-picture-game-wordbox-wrapper">
                <DraggableWord key={item.answer + 69} word={item.answer} />
              </div>
            </div>
          );
        })}
      </GameContent>
    </DndProvider>
  );
};

export default DragWordToPictureGame;
