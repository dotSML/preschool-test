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
import GameCompleted from "../common/gameCompleted";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";

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
  const [audioToTextGameResults, setAudioToTextGameResults] = useState<any>();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const gameState = useSelector<AppState, Array<any>>(
    state => state.audioToTextGame.gameState
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
        Selles mängus pead kuulama teksti ja vastama allolevatele küsimustele
      </GameDescription>
      <GameContent>
        {gameStarted ? (
          <React.Fragment>
            <h3 style={{ margin: "0.5rem 0 1rem 0" }}>TEKST KUULAMISEKS</h3>
            <div className="audio-to-text-questions">
              {gameState?.map((question, idx) => {
                return (
                  <AudioToTextGameQuestion
                    key={idx}
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
