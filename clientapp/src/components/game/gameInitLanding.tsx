import React, {useState} from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import {useDispatch} from "react-redux";
import {INITIALIZE_GAME} from "./actions/gameActions";

const GameInitLanding = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [teacher, setTeacher] = useState<string>("");

    return (
    <div className="game-init-layout">
        <div className="game-init__body">
      <h1 className="game-init-welcome-heading">
        SUITSUPÄÄSU PESA LASTEAIA TESTMÄNG
      </h1>
            <div className="game-init-form">
      <FormGroup>
        <Label className="game-init-form__label">LAPSE NIMI</Label>
        <Input style={{color: 'black'}} value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </FormGroup>
                <FormGroup>
                    <Label className="game-init-form__label">ÕPETAJA</Label>
                    <select onChange={e => setTeacher(e.target.value)}>
                        <option/>
                        <option value="email1">Kasvataja 1</option>
                        <option value="email2">Kasvataja 2</option>
                    </select>
                </FormGroup>
      <Button style={{fontWeight: "bold"}} color="success" size="lg" disabled={!(name !== "" && teacher !== "") } onClick={() => dispatch(INITIALIZE_GAME({name: name, teacher: teacher}))}>
        ALUSTA!
      </Button>
            </div>

        </div>
    </div>
  );
};

export default GameInitLanding;
