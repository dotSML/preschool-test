import React, { useEffect, useState } from "react";
import GameHeading from "../common/gameHeading";
import GameContent from "../common/gameContent";
import GameDescription from "../common/gameDescription";
import AudioToTextGameQuestion from "./audioToTextGameQuestion";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUDIO_TO_TEXT_GAME_STATE } from "./actions/audioToTextGameActions";
import { AppState } from "../../store/store";
import { Button } from "reactstrap";
import StartGameBtn from "../common/startGameBtn";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";
import AudioBtn from "../common/audioBtn";

export type AudioToTextGameProps = Array<{
  question: string;
  options: Array<{
    label: string;
    correct: boolean;
    answer?: string;
  }>;
}>;

const AudioToTextGame: React.FC<{ questions?: AudioToTextGameProps }> = ({
  questions
}) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const gameState = useSelector<AppState, Array<any>>(
    state => state.audioToTextGame.gameState
  );
  const task1StoryAudio = new Audio(
    process.env.PUBLIC_URL + "/audio/task1/task1-story.m4a"
  );
  const gameResults = useSelector<AppState>(state => state.game.results);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!gameState.length) {
      dispatch(SET_AUDIO_TO_TEXT_GAME_STATE(questions));
    }
  }, [dispatch, questions]);

  const handleSetGameStart = () => {
    setGameCompleted(false);
    setGameStarted(true);
  };

  const handleGameEnd = () => {
    let results: any = gameResults;
    results.audioToTextGame = [];
    gameState.forEach(question => {
      let result: any = {};
      result.question = question.question;
      result.answer = question.answer;
      let correctOption = question.options.filter((x: any) => x.correct);
      result.correctAns = correctOption[0].label;
      result.correct = result.answer === result.correctAns;
      results.audioToTextGame.push(result);
    });
    dispatch(POST_GAME_RESULTS(results));
    setGameStarted(false);
    setGameCompleted(true);
  };

  const handleQuestionAnswer = (answer: any, question: any) => {
    let newArr = gameState.map(questionEl => {
      if (questionEl.question === question) {
        return { ...questionEl, answer: answer };
      } else {
        return questionEl;
      }
    });

    dispatch(SET_AUDIO_TO_TEXT_GAME_STATE(newArr));
  };

  return (
    <React.Fragment>
      <GameHeading heading={"1. Teksti mõistmine"} />
      <GameDescription>
        Kuula tähelepanelikult juttu ja proovi meelde jätta mida jutus kuuled
        <AudioBtn
          style={{ marginLeft: "1rem" }}
          audioFile="/task1/task1-tutorial.m4a"
        />
      </GameDescription>
      <GameContent>
        {gameStarted ? (
          <React.Fragment>
            <div
              style={{
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                  marginRight: "1rem",
                  fontWeight: "bold"
                }}
              >
                JUTT KUULAMISEKS
              </span>
              <audio controls>
                <source
                  src={process.env.PUBLIC_URL + "/audio/task1/task1-story.mp3"}
                  type="audio/mp3"
                />
              </audio>
            </div>
            <div className="audio-to-text-questions">
              {gameState?.map((question, idx) => {
                return (
                  <AudioToTextGameQuestion
                    key={idx}
                    questionNo={idx}
                    questionProp={question}
                    selectedAnswer={question.answer}
                    handleQuestionAnswer={handleQuestionAnswer}
                  />
                );
              })}
            </div>
            <div className="audio-to-text-complete-game">
              <Button
                color="primary"
                size="lg"
                style={{
                  fontSize: "2rem",
                  marginTop: "2rem",
                  fontWeight: "bold"
                }}
                onClick={handleGameEnd}
              >
                LÕPETA MÄNG
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <StartGameBtn
            handleGameStart={handleSetGameStart}
            gameCompleted={gameCompleted}
          />
        )}
      </GameContent>
    </React.Fragment>
  );
};

export default AudioToTextGame;
