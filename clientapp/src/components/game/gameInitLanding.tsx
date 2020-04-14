import React from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const GameInitLanding = () => {
  return (
    <div className="game-init-layout">
      <h1 className="game-init-welcome-heading">
        Suitsupääsupesa Lasteaia testmäng
      </h1>
      <h2 className="game-init-secondary-heading">
        Palun sisesta all enda nimi, et mänguga alustada
      </h2>
      <FormGroup>
        <Label style={{ fontSize: "2.5rem" }}>NIMI</Label>
        <Input type="text" />
      </FormGroup>
      <Button color="success" size="lg">
        ALUSTA MÄNGUGA
      </Button>
    </div>
  );
};

export default GameInitLanding;
