import React from "react";
import GameHeading from "../common/gameHeading";
import GameDescription from "../common/gameDescription";
import GameContent from "../common/gameContent";

const ImageSequenceGame = () => {
  return (
    <React.Fragment>
      <GameHeading heading="Pildiseeria" />
      <GameDescription>
        Selles mängus pead lohistama pildid õigesse järjekorda
      </GameDescription>
      <GameContent>PILDISEERIA CONTENT</GameContent>
    </React.Fragment>
  );
};

export default ImageSequenceGame;
