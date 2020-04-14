import React, { useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import { DndProvider } from "react-dnd";
import ImageSequenceGameDraggableImage from "./imageSequenceGameDraggableImage";
import ImageSequenceGameDropZone from "./imageSequenceGameDropZone";
import { Button } from "reactstrap";

export type ImageSequenceGameQuestionType = { order: number; image: string };

type ImageSequenceGameQuestionsType = Array<
  Array<ImageSequenceGameQuestionType>
>;

const ImageSequenceGame: React.FC<{
  questions: ImageSequenceGameQuestionsType;
}> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [imageSlots, setImageSlots] = useState<
    Array<ImageSequenceGameQuestionType>
  >([]);

  useEffect(() => {
    if (!imageSlots.length) {
      setImageSlots([...questions[currentQuestion]]);
    }
  }, [questions, currentQuestion]);

  useEffect(() => {
    setImageSlots([...questions[currentQuestion]]);
  }, [currentQuestion]);

  const reArrangeSlots = (dragItemIdx: number, switchWithIdx: number) => {
    //a, b
    let slotArr = [...imageSlots];
    slotArr[dragItemIdx] = slotArr.splice(
      switchWithIdx,
      1,
      slotArr[dragItemIdx]
    )[0];
    setImageSlots(slotArr);
  };

  const nextQuestion = () => {
    if (questions.length > currentQuestion + 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      setGameCompleted(true);
    }
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
            {imageSlots.length && !gameCompleted
              ? imageSlots.map((question, idx) => {
                  return (
                    <ImageSequenceGameDropZone
                      key={idx}
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
        <div className="image-sequence-game-buttons">
          {!gameCompleted ? (
            <Button size="lg" color="success" onClick={nextQuestion}>
              Olen oma vastuses kindel!
            </Button>
          ) : (
            <span style={{ fontSize: "5rem" }}>Mäng Läbi!</span>
          )}
        </div>
      </GameContent>
    </DndProvider>
  );
};

export default ImageSequenceGame;
