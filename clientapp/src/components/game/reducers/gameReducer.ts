import { Action } from "../../common/types/actionType";

type GameReducerStateType = {
  currentGame: string;
  results: {
    audioToTextGame: Array<any>;
    matchWordsWithPictureGame: Array<any>;
    matchOppositeWordGame: Array<any>;
    pickTheRightWordGame: Array<any>;
    imageSequenceGame: Array<any>;
    monthsGame: Array<any>;
  };
};

const initialState: GameReducerStateType = {
  currentGame: "",
  results: {
    audioToTextGame: [],
    matchWordsWithPictureGame: [],
    matchOppositeWordGame: [],
    pickTheRightWordGame: [],
    imageSequenceGame: [],
    monthsGame: []
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

    default:
      return state;
  }
};
