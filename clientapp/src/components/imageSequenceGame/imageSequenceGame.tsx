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
import StartGameBtn from "../common/startGameBtn";
import GameQuestionCounter from "../common/gameQuestionCounter";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import {
  SET_IMAGE_SEQUENCE_GAME_COMPLETED,
  SET_IMAGE_SEQUENCE_GAME_CURRENT_QUESTION,
  SET_IMAGE_SEQUENCE_GAME_STARTED
} from "./actions/imageSequenceGameActions";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";
import { ImageSequenceGameReducerStateType } from "./reducers/imageSequenceGameReducer";

export type ImageSequenceGameQuestionType = { order: number; image: string };

type ImageSequenceGameQuestionsType = Array<
  Array<ImageSequenceGameQuestionType>
>;

const ImageSequenceGame: React.FC<{
  questions: ImageSequenceGameQuestionsType;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const gameResults = useSelector<AppState, Array<any>>(
    state => state.game.results
  );
  const [results, setResults] = useState<Array<any>>([]);
  const imageSequenceGameState = useSelector<
    AppState,
    ImageSequenceGameReducerStateType
  >(state => state.imageSequenceGame);
  const [imageSlots, setImageSlots] = useState<
    Array<ImageSequenceGameQuestionType>
  >([]);

  useEffect(() => {
    if (!imageSlots.length) {
      setImageSlots([...questions[imageSequenceGameState.currentQuestion]]);
    }
  }, [questions, imageSequenceGameState.currentQuestion]);

  useEffect(() => {
    setImageSlots([...questions[imageSequenceGameState.currentQuestion]]);
  }, [imageSequenceGameState.currentQuestion]);

  const handleGameStart = () => {
    dispatch(SET_IMAGE_SEQUENCE_GAME_CURRENT_QUESTION(0));
    dispatch(SET_IMAGE_SEQUENCE_GAME_STARTED());
  };

  // const isAscending = (array: Array<any>, key:number) => {
  //   for (let i = 1; i < array.length; i++) {
  //     if (array[i - 1][key] - array[i][key] > 0)
  //       return false;
  //   }
  //   return true;
  // }

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
    if (questions.length > imageSequenceGameState.currentQuestion + 1) {
      dispatch(
        POST_GAME_RESULTS(
          Object.assign({ ...gameResults }, { imageSequenceGame: imageSlots })
        )
      );
      let currQuestion = imageSequenceGameState.currentQuestion;
      dispatch(SET_IMAGE_SEQUENCE_GAME_CURRENT_QUESTION(currQuestion + 1));
    } else {
      dispatch(SET_IMAGE_SEQUENCE_GAME_COMPLETED());
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading="3. Pildiseeria" />
      <GameDescription>
        Selles mängus pead lohistama pildid õigesse järjekorda
      </GameDescription>
      <GameContent>
        {imageSequenceGameState.gameStarted ? (
          <div className="image-sequence-game-wrapper">
            <GameQuestionCounter
              totalAmountOfQuestions={questions.length}
              currentQuestion={imageSequenceGameState.currentQuestion + 1}
            />
            <div className="image-sequence-game-images-container">
              {imageSlots.length && !imageSequenceGameState.gameCompleted
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
            <div className="image-sequence-game-buttons">
              {!imageSequenceGameState.gameCompleted ? (
                <Button
                  size="lg"
                  color="success"
                  style={{ fontSize: "2rem" }}
                  onClick={nextQuestion}
                >
                  Olen oma vastuses kindel!
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <StartGameBtn
            handleGameStart={handleGameStart}
            gameCompleted={imageSequenceGameState.gameCompleted}
          />
        )}
      </GameContent>
    </DndProvider>
  );
};

export default ImageSequenceGame;
