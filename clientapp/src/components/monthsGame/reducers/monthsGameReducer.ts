import { Action } from "../../common/types/actionType";

type MonthsGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentMonth: number;
  noMonths: boolean;
};

const initialState: MonthsGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentMonth: 0,
  noMonths: false
};

export const monthsGameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_MONTHS_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_MONTHS_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_MONTHS_GAME_CURRENT_MONTH": {
      return {
        ...state,
        currentMonth: action.payload
      };
    }

    case "SET_MONTHS_GAME_NO_MONTHS": {
      return {
        ...state,
        noMonths: action.payload
      };
    }

    default:
      return state;
  }
};
