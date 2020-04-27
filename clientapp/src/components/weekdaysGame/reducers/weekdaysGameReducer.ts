import { Action } from "../../common/types/actionType";

type WeekdaysGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentQuestion: number;
};

const initialState: WeekdaysGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentQuestion: 0
};

export const weekdaysGameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_WEEKDAYS_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_WEEKDAYS_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_WEEKDAYS_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    default:
      return state;
  }
};
