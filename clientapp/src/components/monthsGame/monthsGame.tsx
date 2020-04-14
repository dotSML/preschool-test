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

const MonthsGame: React.FC<{ questions: Array<string> }> = ({ questions }) => {
  const [dropCount, setDropCount] = useState<number>(0); //11 max
  const [months, setMonths] = useState<Array<string>>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [noMonths, setNoMonths] = useState<boolean>(false);

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
    if (currentMonth + 1 < months.length) {
      setCurrentMonth(c => c + 1);
    } else {
      setNoMonths(true);
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <GameHeading heading={"4. KUUDE NIMETUSED"} />
      <GameDescription>
        Selles mängus pead lohistama kuu õige aastaja peale.
      </GameDescription>
      <GameContent>
        <div className="months-game-seasons-container">
          {Seasons.map(season => {
            return (
              <SeasonDropContainer
                key={season.label}
                season={season}
                getNextMonth={getNextMonth}
              />
            );
          })}
        </div>
        <div className="months-game-draggable-month-container">
          {months.length && !noMonths ? (
            <DraggableMonth month={months[currentMonth]} />
          ) : (
            "TUBLI!"
          )}
        </div>
      </GameContent>
    </DndProvider>
  );
};

export default MonthsGame;
