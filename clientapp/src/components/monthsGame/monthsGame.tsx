import React, { useEffect, useState } from "react";
import MultiBackend from "react-dnd-multi-backend";
import { HTML5toTouch } from "../common/dnd";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { DndProvider } from "react-dnd";
import MonthsDropContainer from "./monthsDropContainer";
import { Months, Seasons } from "./months";
import SeasonDropContainer from "./seasonDropContainer";
import DraggableWord from "../dragWordToPictureGame/draggableWord";
import DraggableMonth from "./draggableMonth";
import { shuffleArray } from "../common/helpers/arrayHelpers";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import {
  SET_MONTHS_GAME_COMPLETED,
  SET_MONTHS_GAME_CURRENT_MONTH,
  SET_MONTHS_GAME_NO_MONTHS,
  SET_MONTHS_GAME_STARTED
} from "./actions/monthsGameActions";
import StartGameBtn from "../common/startGameBtn";
import { POST_GAME_RESULTS } from "../game/actions/gameActions";

const MonthsGame: React.FC<{ questions: Array<string> }> = ({ questions }) => {
  const gameState = useSelector<AppState, any>(state => state.monthsGame);
  const gameResults = useSelector<AppState, any>(state => state.game.results);
  const dispatch = useDispatch();
  const [dropCount, setDropCount] = useState<number>(0); //11 max
  const [months, setMonths] = useState<Array<string>>([]);
  const [results, setResults] = useState<Array<boolean>>([]);

  useEffect(() => {
    let monthsArr = shuffleArray([
      ...Months.winter,
      ...Months.autumn,
      ...Months.summer,
      ...Months.spring
    ]);
    setMonths(monthsArr);
  }, []);

  const getNextMonth = () => {
    if (gameState.currentMonth + 1 < months.length) {
      dispatch(SET_MONTHS_GAME_CURRENT_MONTH(gameState.currentMonth + 1));
    } else {
      dispatch(SET_MONTHS_GAME_NO_MONTHS(true));
      dispatch(
        POST_GAME_RESULTS(
          Object.assign({ ...gameResults }, { monthsGame: results })
        )
      );
      dispatch(SET_MONTHS_GAME_COMPLETED());
    }
  };

  const handleDrop = (season: any, month: string) => {
    let tempResultsArr = [...results];
    if (season.months.includes(month)) {
      console.log("CORRECT");
      tempResultsArr.push(true);
      setResults(tempResultsArr);
    } else {
      console.log("FALSE");
      tempResultsArr.push(false);
      setResults(tempResultsArr);
    }
  };

  const handleGameStart = () => {
    dispatch(SET_MONTHS_GAME_NO_MONTHS(false));
    dispatch(SET_MONTHS_GAME_CURRENT_MONTH(0));
    dispatch(SET_MONTHS_GAME_STARTED());
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"4. KUUDE NIMETUSED"} />
      <GameDescription>
        Selles mängus pead lohistama kuu õige aastaja peale.
      </GameDescription>
      <GameContent>
        {gameState.gameStarted ? (
          <React.Fragment>
            <div className="months-game-seasons-container">
              {Seasons.map(season => {
                return (
                  <SeasonDropContainer
                    key={season.label}
                    handleDrop={handleDrop}
                    season={season}
                    getNextMonth={getNextMonth}
                  />
                );
              })}
            </div>
            <div className="months-game-draggable-month-container">
              {months.length && !gameState.noMonths ? (
                <DraggableMonth month={months[gameState.currentMonth]} />
              ) : (
                ""
              )}
            </div>
          </React.Fragment>
        ) : (
          <StartGameBtn
            handleGameStart={handleGameStart}
            gameCompleted={gameState.gameCompleted}
          />
        )}
      </GameContent>
    </DndProvider>
  );
};

export default MonthsGame;
