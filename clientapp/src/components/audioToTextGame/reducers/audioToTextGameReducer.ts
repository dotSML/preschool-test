import { Action } from "../../common/types/actionType";

export type AudioToTextGameReducerStateType = {
  questions: Array<any>;
  gameStarted: boolean,
  gameCompleted: boolean
};

const initialState: AudioToTextGameReducerStateType = {
  questions: [],
  gameStarted: false,
  gameCompleted: false
};

export const audioToTextGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_AUDIO_TO_TEXT_GAME_STATE": {
      return {
        ...state,
        questions: [...action.payload]
      };
    }

    case "SET_AUDIO_TO_TEXT_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      }
    }

    case "SET_AUDIO_TO_TEXT_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      }
    }

    default:
      return state;
  }
};
