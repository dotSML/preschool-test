import React, { useEffect, useState, useRef, useMemo } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";
import { Button } from "reactstrap";

const DogCanvasGame = () => {
  const canvasRef = useRef(null);
  const initialPosition = useMemo(() => ({ x: 200, y: 400 }), []);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    ...initialPosition
  });

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
    let el: any = canvasRef.current;
    let ctx = el.getContext("2d");
    let drawDistance = 100;
    let tempPosition = { ...position };
    ctx?.beginPath();
    ctx.strokeStyle = "#4c4c4c";
    ctx?.moveTo(position.x, position.y);
    switch (direction) {
      case "up":
        {
          tempPosition = Object.assign(tempPosition, {
            y: position.y - drawDistance
          });
        }
        break;
      case "left":
        {
          tempPosition = Object.assign(tempPosition, {
            x: position.x - drawDistance
          });
        }
        break;
      case "right":
        {
          tempPosition = Object.assign(tempPosition, {
            x: position.x + drawDistance
          });
        }
        break;
      case "down":
        {
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
    setPosition(initialPosition);
    const el: any = canvasRef.current;
    const ctx = el.getContext("2d");
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    console.log(position);
    drawGrid(el, ctx);
    drawStart(ctx);
  };

  useEffect(() => {
    initializeDrawing();
  }, []);

  return (
    <React.Fragment>
      <GameHeading heading="10. Joonistamine" />
      <GameDescription>
        Selles mängus tuleb sul kuulata heli ja vajutada õigete noolte peale
      </GameDescription>
      <GameContent>
        <div className="dog-canvas-game-box-wrapper">
          <canvas className="gridCanvas" ref={canvasRef} />
          <div className="dog-canvas-game-buttons">
            <div className="dog-canvas-game-button" onClick={() => draw("up")}>
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
              color="primary"
              size="lg"
              style={{
                fontSize: "2rem",
                marginTop: "8rem",
                fontWeight: "bold"
              }}
              onClick={() => initializeDrawing()}
            >
              ALUSTA UUESTI
            </Button>
          </div>
        </div>
      </GameContent>
    </React.Fragment>
  );
};

export default DogCanvasGame;
