import { Action } from "../../common/types/actionType";

type NumberSequencingGameReducerStateType = {
  assignments: any;
  currentAssignment: number;
};

const initialState: NumberSequencingGameReducerStateType = {
  currentAssignment: 0,
  assignments: {
    numberSequencingGame: {
      gameStarted: false,
      gameCompleted: false,
      currentQuestion: 0
    }
  }
};

export const numberSequencingGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_STARTED": {
      return {
        ...state,
        gameStarted: true,
        gameCompleted: false
      };
    }
    case "SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_COMPLETED": {
      return {
        ...state,
        gameStarted: false,
        gameCompleted: true
      };
    }

    case "SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        currentQuestion: action.payload
      };
    }

    case "SET_NUMBER_SEQUENCING_GAME_CURRENT_ASSIGNMENT": {
      return {
        ...state,
        currentAssignment: action.payload
      };
    }
    case "SET_NUMBER_SEQUENCING_GAME_COMPLETED": {
      return {
        ...state,
        gameCompleted: true,
        gameStarted: false
      };
    }
    case "SET_NUMBER_SEQUENCING_GAME_STARTED": {
      return {
        ...state,
        gameCompleted: false,
        gameStarted: true
      };
    }

    default:
      return state;
  }
};
