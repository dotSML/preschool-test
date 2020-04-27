import React, { useEffect, useState } from "react";
import PickTheRightWordGameQuestion from "./pickTheRightWordGameQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { POST_GAME_RESULTS } from "../../game/actions/gameActions";

type PickTheRightWordGameQuestionArrayType = Array<{
  word: string;
  options: Array<string>;
}>;

const PickTheRightWordGame: React.FC<{
  questions: PickTheRightWordGameQuestionArrayType;
  handleGameEnd: Function;
}> = ({ questions, handleGameEnd }) => {
  const dispatch = useDispatch();
  const gameResults = useSelector<AppState, Array<any>>(
    state => state.game.results
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<Array<any>>([]);
  const handleQuestionAnswer = (answer: string, expected: string) => {
    let tempResults = results;
    tempResults.push(answer === expected);
    setResults(tempResults);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(c => c + 1);
    } else {
      dispatch(
        POST_GAME_RESULTS(
          Object.assign({ ...gameResults }, { pickTheRightWordGame: results })
        )
      );
      handleGameEnd();
    }
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div className="pick-the-right-word-game-wrapper">
      {!gameCompleted ? (
        <PickTheRightWordGameQuestion
          question={questions[currentQuestion]}
          handleAnswer={handleQuestionAnswer}
        />
      ) : (
        "GAME COMPLETED"
      )}
    </div>
  );
};

export default PickTheRightWordGame;
