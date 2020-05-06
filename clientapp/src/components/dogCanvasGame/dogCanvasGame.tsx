import React, { useEffect, useState, useRef, useMemo } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { DogCanvasGameReducerStateType } from "./reducers/dogCanvasGameReducer";
import StartGameBtn from "../common/startGameBtn";
import {
  SET_DOG_CANVAS_GAME_COMPLETED,
  SET_DOG_CANVAS_GAME_CURRENT_QUESTION,
  SET_DOG_CANVAS_GAME_STARTED
} from "./actions/dogCanvasGameActions";

const DogCanvasGame: React.FC<{ questions: string[] }> = ({ questions }) => {
  const canvasRef = useRef(null);
  const [drawingComplete, setDrawingComplete] = useState<boolean>(false);
  const initialPosition = useMemo(() => ({ x: 200, y: 400 }), []);
  const dispatch = useDispatch();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    ...initialPosition
  });
  const gameState = useSelector<AppState, DogCanvasGameReducerStateType>(
    state => state.dogCanvasGame
  );

  const drawGrid = (el: any, ctx: any) => {
    el.width = 600;
    el.height = 600;
    let dpi = window.devicePixelRatio;
    //get canvas
    //get context
    function fix_dpi(dpi: any) {
      //get CSS height
      //the + prefix casts it to an integer
      //the slice method gets rid of "px"
      let style_height = +getComputedStyle(el)
        .getPropertyValue("height")
        .slice(0, -2);
      //get CSS width
      let style_width = +getComputedStyle(el)
        .getPropertyValue("width")
        .slice(0, -2);
      //scale the canvas
      el.setAttribute("height", style_height * dpi);
      el.setAttribute("width", style_width * dpi);
    }

    fix_dpi(dpi);

    for (var x = 0.5; x < 1200; x += 100) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1200);
    }

    for (var y = 0.5; y < 1200; y += 100) {
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
    }

    ctx.moveTo(0, 0);
    // context.lineTo(380, 380);

    ctx.strokeStyle = "#ddd";
    ctx.stroke();

    //get DPI
  };

  const draw = (direction: string) => {
    if (!drawingComplete) {
      let el: any = canvasRef.current;
      let ctx = el.getContext("2d");
      let drawDistance = 100;
      let tempPosition = { ...position };
      const curQuestion = questions[gameState.currentQuestion];

      ctx?.beginPath();
      ctx.strokeStyle = "#4c4c4c";
      ctx?.moveTo(position.x, position.y);
      switch (direction) {
        case "up":
          {
            if (curQuestion === "up") {
              console.log("CORRECT");
            } else {
              console.log("FALSE");
            }
            tempPosition = Object.assign(tempPosition, {
              y: position.y - drawDistance
            });
          }
          break;
        case "left":
          {
            if (curQuestion === "left") {
              console.log("CORRECT");
            } else {
              console.log("FALSE");
            }
            tempPosition = Object.assign(tempPosition, {
              x: position.x - drawDistance
            });
          }
          break;
        case "right":
          {
            if (curQuestion === "right") {
              console.log("CORRECT");
            } else {
              console.log("false");
            }
            tempPosition = Object.assign(tempPosition, {
              x: position.x + drawDistance
            });
          }
          break;
        case "down":
          {
            if (curQuestion === "down") {
              console.log("CORRECT");
            } else {
              console.log("FALSE");
            }
            tempPosition = Object.assign(tempPosition, {
              y: position.y + drawDistance
            });
          }
          break;
        default: {
          tempPosition = position;
        }
      }
      setPosition(tempPosition);
      ctx?.lineTo(tempPosition.x, tempPosition.y);
      ctx.lineWidth = 5;
      ctx?.stroke();
      if (gameState.currentQuestion + 1 < questions.length) {
        dispatch(
          SET_DOG_CANVAS_GAME_CURRENT_QUESTION(gameState.currentQuestion + 1)
        );
      } else {
        setDrawingComplete(true);
      }
    } else {
      console.log("NO MO' DRAWING");
    }
  };

  const drawStart = (ctx: any) => {
    ctx.beginPath();
    let posData = { ...initialPosition };
    ctx?.moveTo(posData.x, posData.y);
    ctx.lineTo(posData.x + 1, posData.y + 1);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx?.stroke();
    ctx?.moveTo(posData.x, posData.y + 130);
    ctx?.lineTo(posData.x + 70, posData.y + 130);
    ctx?.stroke();
    // ctx?.moveTo(position.x + 200, position.y - 30);
    ctx?.beginPath();
    ctx.arc(posData.x + 230, posData.y - 30, 10, 0, 2 * Math.PI);
    ctx?.stroke();
  };

  const initializeDrawing = () => {
    dispatch(SET_DOG_CANVAS_GAME_CURRENT_QUESTION(0));
    setDrawingComplete(false);
    setPosition(initialPosition);
    const el: any = canvasRef.current;
    const ctx = el.getContext("2d");
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    console.log(position);
    drawGrid(el, ctx);
    drawStart(ctx);
  };

  const handleGameStart = () => {
    dispatch(SET_DOG_CANVAS_GAME_STARTED());
  };

  useEffect(() => {
    if (gameState.gameStarted) {
      setDrawingComplete(false);
      initializeDrawing();
    }
  }, [gameState.gameStarted]);

  return (
    <React.Fragment>
      <GameHeading heading="10. Joonistamine" />
      <GameDescription>
        Selles mängus tuleb sul kuulata heli ja vajutada õigete noolte peale
      </GameDescription>
      <GameContent>
        {gameState.gameStarted ? (
          <div className="dog-canvas-game-box-wrapper">
            <canvas
              className="gridCanvas"
              ref={canvasRef}
              style={{ backgroundColor: "white" }}
            />
            <div className="dog-canvas-game-buttons">
              <div
                className="dog-canvas-game-button"
                onClick={() => draw("up")}
              >
                <img
                  src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                  style={{ transform: "rotate(180deg)" }}
                  className="dog-canvas-game-button-icon"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <div
                  className="dog-canvas-game-button"
                  onClick={() => draw("left")}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                    style={{ transform: "rotate(90deg)" }}
                    className="dog-canvas-game-button-icon"
                  />
                </div>
                <div
                  className="dog-canvas-game-button"
                  onClick={() => draw("right")}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                    style={{ transform: "rotate(270deg)" }}
                    className="dog-canvas-game-button-icon"
                  />
                </div>
              </div>
              <div
                className="dog-canvas-game-button"
                onClick={() => draw("down")}
              >
                <img
                  src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                  className="dog-canvas-game-button-icon"
                />
              </div>
              <Button
                color="success"
                size="lg"
                disabled={!drawingComplete}
                style={{
                  fontSize: "2rem",
                  marginTop: "8rem",
                  fontWeight: "bold"
                }}
                onClick={() => {
                  dispatch(SET_DOG_CANVAS_GAME_COMPLETED());
                }}
              >
                LÕPETA MÄNG
              </Button>
              <Button
                color="primary"
                size="lg"
                style={{
                  fontSize: "1.5rem",
                  marginTop: "8rem",
                  fontWeight: "bold"
                }}
                onClick={() => initializeDrawing()}
              >
                ALUSTA UUESTI
              </Button>
            </div>
          </div>
        ) : (
          <StartGameBtn
            handleGameStart={handleGameStart}
            gameCompleted={gameState.gameCompleted}
          />
        )}
      </GameContent>
    </React.Fragment>
  );
};

export default DogCanvasGame;
