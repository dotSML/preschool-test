import { Action } from "../../common/types/actionType";

export type CalculationGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentQuestion: number;
  chosenAnswer: number;
};

const initialState: CalculationGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentQuestion: 0,
  chosenAnswer: 0
};

export const calculationGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_CALCULATION_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_CALCULATION_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_CALCULATION_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    case "SET_CALCULATION_GAME_CHOSEN_ANSWER": {
      return {
        ...state,
        chosenAnswer: action.payload
      };
    }

    default:
      return state;
  }
};
