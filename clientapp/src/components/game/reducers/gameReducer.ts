import { Action } from "../../common/types/actionType";

export type GameReducerStateType = {
  currentGame: number;
  gameInitiated: boolean;
  gameCompleted: boolean;
  player: string;
  teacher: string;
  results: {
    audioToTextGame: Array<any>;
    matchWordsWithPictureGame: Array<any>;
    matchOppositeWordGame: Array<any>;
    pickTheRightWordGame: Array<any>;
    imageSequenceGame: Array<any>;
    monthsGame: Array<any>;
    numberSequencingGame: Array<any>;
    calculationGame: Array<any>;
    compareQuantitiesGame: Array<any>;
    analogueClockGame: Array<any>;
    dogCanvasGame: Array<any>;
  };
};

const initialState: GameReducerStateType = {
  currentGame: 0,
  gameInitiated: false,
  gameCompleted: false,
  player: "",
  teacher: "",
  results: {
    audioToTextGame: [],
    matchWordsWithPictureGame: [],
    matchOppositeWordGame: [],
    pickTheRightWordGame: [],
    imageSequenceGame: [],
    monthsGame: [],
    numberSequencingGame: [],
    calculationGame: [],
    compareQuantitiesGame: [],
    analogueClockGame: [],
    dogCanvasGame: []
  }
};

export const gameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "POST_GAME_RESULTS": {
      return {
        ...state,
        results: action.payload
      };
    }
    case "INITIALIZE_GAME": {
      return {
        ...state,
        gameInitiated: true,
        player: action.payload.name,
        teacher: action.payload.teacher
      };
    }

    case "COMPLETE_GAME": {
      return {
        ...state,
        gameCompleted: true,
        gameInitiated: false,
        currentGame: 0
      };
    }

    case "SET_GAME_CURRENT_GAME": {
      return {
        ...state,
        currentGame: action.payload
      };
    }

    default:
      return state;
  }
};
