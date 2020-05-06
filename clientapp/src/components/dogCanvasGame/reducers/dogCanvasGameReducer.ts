import { Action } from "../../common/types/actionType";

export type DogCanvasGameReducerStateType = {
  gameStarted: boolean;
  gameCompleted: boolean;
  currentQuestion: number;
  selectedAnswer: any | null;
};

const initialState: DogCanvasGameReducerStateType = {
  gameStarted: false,
  gameCompleted: false,
  currentQuestion: 0,
  selectedAnswer: null
};

export const dogCanvasGameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_DOG_CANVAS_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_DOG_CANVAS_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_DOG_CANVAS_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    case "SET_DOG_CANVAS_GAME_SELECTED_ANSWER": {
      return {
        ...state,
        selectedAnswer: action.payload
      };
    }

    default:
      return state;
  }
};
