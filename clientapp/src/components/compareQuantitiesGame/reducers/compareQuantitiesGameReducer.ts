import { Action } from "../../common/types/actionType";

export type CompareQuantitiesGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentQuestion: number;
  selectedAnswer: number;
};

const initialState: CompareQuantitiesGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentQuestion: 0,
  selectedAnswer: 0
};

export const compareQuantitiesGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_COMPARE_QUANTITIES_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_COMPARE_QUANTITIES_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_COMPARE_QUANTITIES_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    case "SET_COMPARE_QUANTITIES_GAME_SELECTED_ANSWER": {
      return {
        ...state,
        selectedAnswer: action.payload
      };
    }

    default:
      return state;
  }
};
