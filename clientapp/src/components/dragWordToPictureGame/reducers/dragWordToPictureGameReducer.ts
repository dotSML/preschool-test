import { Action } from "../../common/types/actionType";

export type DragWordToPictureGameReducerStateType = {
  gameStarted: boolean;
  currentQuestion: number;
  currentAssignment: number;
  gameCompleted: boolean;
  results: Array<any>;
  matchWordWithPictureGame: {
    gameCompleted: boolean;
    currentQuestion: number;
  };
  matchOppositeWordsGame: {
    questions: Array<any>;
    currentQuestion: number;
    optionSlots: Array<string>;
    results: Array<any>;
  };
  pickTheRightWordGame: {
    gameCompleted: boolean;
  };
};

const initialState: DragWordToPictureGameReducerStateType = {
  gameStarted: false,
  currentQuestion: 0,
  currentAssignment: 0,
  gameCompleted: false,
  results: [],
  matchWordWithPictureGame: {
    gameCompleted: false,
    currentQuestion: 0
  },
  matchOppositeWordsGame: {
    questions: [],
    optionSlots: [],
    currentQuestion: 0,
    results: []
  },
  pickTheRightWordGame: {
    gameCompleted: false
  }
};

export const dragWordToPictureGameReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case "RESET_DRAG_WORD_TO_PICTURE_GAME_STATE": {
      return initialState;
    }

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

    case "SET_MATCH_OPPOSITE_WORDS_GAME_QUESTIONS": {
      return {
        ...state,
        matchOppositeWordsGame: {
          ...state.matchOppositeWordsGame,
          questions: action.payload
        }
      };
    }

    case "SET_MATCH_OPPOSITE_WORDS_OPTIONS": {
      let newOptions = action.payload;
      return {
        ...state,
        matchOppositeWordsGame: {
          ...state.matchOppositeWordsGame,
          questions: [
            ...state.matchOppositeWordsGame.questions,
            (state.matchOppositeWordsGame.questions[
              state.matchOppositeWordsGame.currentQuestion
            ].options = newOptions)
          ]
        }
      };
    }

    case "SET_MATCH_OPPOSITE_WORDS_OPTION_SLOTS": {
      return {
        ...state,
        matchOppositeWordsGame: {
          ...state.matchOppositeWordsGame,
          optionSlots: action.payload
        }
      };
    }

    case "SET_MATCH_OPPOSITE_WORDS_GAME_CURRENT_QUESTION": {
      return {
        ...state,
        matchOppositeWordsGame: {
          ...state.matchOppositeWordsGame,
          currentQuestion: action.payload
        }
      };
    }

    case "SET_MATCH_OPPOSITE_WORDS_GAME_RESULTS": {
      return {
        ...state,
        matchOppositeWordsGame: {
          ...state.matchOppositeWordsGame,
          results: action.payload
        }
      };
    }

    default:
      return state;
  }
};
