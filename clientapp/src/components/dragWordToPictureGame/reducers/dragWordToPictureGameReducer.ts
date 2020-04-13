import { Action } from "../../common/types/actionType";

type GameReducerStateType = {
  gameStarted: boolean;
  currentQuestion: number;
  currentAssignment: number;
  gameCompleted: boolean;
};

const initialState: GameReducerStateType = {
  gameStarted: false,
  currentQuestion: 0,
  currentAssignment: 0,
  gameCompleted: false
};

export const dragWordToPictureGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_DRAG_WORD_TO_PICTURE_GAME_START_STATE": {
      return {
        ...state,
        gameStarted: action.payload
      };
    }
    case "SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }
    case "SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT": {
      return {
        ...state,
        currentAssignment: action.payload
      };
    }
    case "SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED": {
      return {
        ...state,
        gameCompleted: action.payload
      };
    }

    default:
      return state;
  }
};
