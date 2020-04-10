import { Action } from "../../common/types/actionType";

type GameReducerStateType = {
  gameState: Array<any>;
};

const initialState: GameReducerStateType = {
  gameState: []
};

export const audioToTextGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_AUDIO_TO_TEXT_GAME_STATE": {
      return {
        ...state,
        gameState: [...action.payload]
      };
    }

    default:
      return state;
  }
};
