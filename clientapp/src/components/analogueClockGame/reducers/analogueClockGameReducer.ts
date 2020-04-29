import { Action } from "../../common/types/actionType";

export type AnalogueClockGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentQuestion: number;
  selectedAnswer: any | null;
};

const initialState: AnalogueClockGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentQuestion: 0,
  selectedAnswer: null
};

export const analogueClockGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_ANALOGUE_CLOCK_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_ANALOGUE_CLOCK_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_ANALOGUE_CLOCK_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    case "SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER": {
      return {
        ...state,
        selectedAnswer: action.payload
      };
    }

    default:
      return state;
  }
};
