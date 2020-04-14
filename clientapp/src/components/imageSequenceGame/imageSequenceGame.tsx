import React, { useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import { DndProvider } from "react-dnd";
import ImageSequenceGameDraggableImage from "./imageSequenceGameDraggableImage";
import ImageSequenceGameDropZone from "./imageSequenceGameDropZone";
import { shuffleArray } from "../common/helpers/arrayHelpers";

export type ImageSequenceGameQuestionType = { order: number; image: string };

type ImageSequenceGameQuestionsType = Array<
  Array<ImageSequenceGameQuestionType>
>;

const ImageSequenceGame: React.FC<{
  questions: ImageSequenceGameQuestionsType;
}> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [imageSlots, setImageSlots] = useState<
    Array<ImageSequenceGameQuestionType>
  >([]);

  useEffect(() => {
    if (!imageSlots.length) {
      setImageSlots([...shuffleArray(questions[currentQuestion])]);
    }
  }, [questions, currentQuestion]);

  const reArrangeSlots = (dragItemIdx: number, switchWithIdx: number) => {
    //a, b
    let slotArr = [...imageSlots];
    console.log(slotArr);
    slotArr[dragItemIdx] = slotArr.splice(
      switchWithIdx,
      1,
      slotArr[dragItemIdx]
    )[0];
    setImageSlots(slotArr);
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading="3. Pildiseeria" />
      <GameDescription>
        Selles mängus pead lohistama pildid õigesse järjekorda
      </GameDescription>
      <GameContent>
        <div className="image-sequence-game-wrapper">
          <div className="image-sequence-game-images-container">
            {imageSlots.length
              ? imageSlots.map((question, idx) => {
                  return (
                    <ImageSequenceGameDropZone
                      sequenceIdx={idx}
                      reArrangeSlots={reArrangeSlots}
                      droppedImage={
                        <ImageSequenceGameDraggableImage
                          sequenceIdx={idx}
                          question={question}
                        />
                      }
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </GameContent>
    </DndProvider>
  );
};

export default ImageSequenceGame;
