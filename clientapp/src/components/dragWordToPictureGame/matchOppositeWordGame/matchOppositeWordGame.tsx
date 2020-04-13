import React, { useEffect } from "react";
import MatchOppositeWordDropZone from "./matchOppositeWordDropZone";
import MatchOppositeWordDraggableWord from "./matchOppositeWordDraggableWord";
import { SET_MATCH_OPPOSITE_WORDS_OPTIONS } from "../matchWordWithPictureGame/actions/matchOppositeWordGameActions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";

const MatchOppositeWordGame: React.FC<{
  questions: Array<Array<{ word: string; image: string; match: string }>>;
}> = ({ questions }) => {
  const dispatch = useDispatch();
  const matchOptions = useSelector<AppState, Array<any>>(
    state => state.dragWordToPictureGame.matchOppositeWordsGame.options
  );
  useEffect(() => {
    let matches: Array<any> = [];
    let setOfMatches: Array<any> = [];

    if (questions.length) {
      questions.forEach((question, idx) => {
        question.forEach(item => {
          setOfMatches.push(item.match);
        });
        matches.push(setOfMatches);
        setOfMatches = [];
      });
      dispatch(SET_MATCH_OPPOSITE_WORDS_OPTIONS(matches));
    }
  }, [dispatch, questions]);

  return (
    <div className="match-opposite-words-game-wrapper">
      <div className="match-opposite-words-game-options">
        {questions[0].map((question: any) => {
          return <MatchOppositeWordDropZone img={question.word} />;
        })}
      </div>
      <div
        className="match-opposite-words-game-options"
        style={{ marginTop: "2rem" }}
      >
        {matchOptions.length
          ? matchOptions?.[0].map((match: any) => {
              return <MatchOppositeWordDraggableWord word={{ word: match }} />;
            })
          : ""}
      </div>
    </div>
  );
};

export default MatchOppositeWordGame;
