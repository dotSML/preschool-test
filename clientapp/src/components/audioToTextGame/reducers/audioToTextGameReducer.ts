import { Action } from "../../common/types/actionType";

export type AudioToTextGameReducerStateType = {
  gameState: Array<any>;
};

const initialState: AudioToTextGameReducerStateType = {
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
