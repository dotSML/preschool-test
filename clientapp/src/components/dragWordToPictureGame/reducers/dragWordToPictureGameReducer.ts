import { Action } from "../../common/types/actionType";

type GameReducerStateType = {
  gameStarted: boolean;
  currentQuestion: number;
  currentAssignment: number;
  gameCompleted: boolean;
  matchWordWithPictureGame: {
    gameCompleted: boolean;
    currentQuestion: number;
  };
};

const initialState: GameReducerStateType = {
  gameStarted: false,
  currentQuestion: 0,
  currentAssignment: 0,
  gameCompleted: false,
  matchWordWithPictureGame: {
    gameCompleted: false,
    currentQuestion: 0
  }
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

    case "SET_MATCH_WORD_WITH_PICTURE_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        matchWordWithPictureGame: {
          ...state.matchWordWithPictureGame,
          currentQuestion: action.payload
        }
      };
    }

    case "SET_MATCH_WORD_WITH_PICTURE_GAME_COMPLETED": {
      return {
        ...state,
        matchWordWithPictureGame: {
          ...state.matchWordWithPictureGame,
          gameCompleted: action.payload
        }
      };
    }

    default:
      return state;
  }
};
