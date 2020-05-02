import React, { useEffect } from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";

const DogCanvasGame = () => {
  const drawGrid = () => {
    let el: any = document.querySelector(".gridCanvas");
    let context = el.getContext("2d");

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

    for (var x = 0.5; x < 1200; x += 50) {
      context.moveTo(x, 0);
      context.lineTo(x, 1200);
    }

    for (var y = 0.5; y < 1200; y += 50) {
      context.moveTo(0, y);
      context.lineTo(1200, y);
    }

    context.moveTo(0, 0);
    // context.lineTo(380, 380);

    context.strokeStyle = "#ddd";
    context.stroke();

    //get DPI
  };

  useEffect(() => {
    drawGrid();
  }, []);

  return (
    <React.Fragment>
      <GameHeading heading="10. Joonistamine" />
      <GameDescription>
        Selles mängus tuleb sul kuulata heli ja vajutada õigete noolte peale
      </GameDescription>
      <GameContent>
        <div className="dog-canvas-game-box-wrapper">
          <canvas className="gridCanvas" />
        </div>
      </GameContent>
    </React.Fragment>
  );
};

export default DogCanvasGame;
