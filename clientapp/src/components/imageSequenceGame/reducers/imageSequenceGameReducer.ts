import { Action } from "../../common/types/actionType";

type ImageSequenceGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentQuestion: number;
};

const initialState: ImageSequenceGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentQuestion: 0
};

export const imageSequenceGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_IMAGE_SEQUENCE_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_IMAGE_SEQUENCE_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_IMAGE_SEQUENCE_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    default:
      return state;
  }
};
