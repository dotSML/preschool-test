import { Action } from "../../common/types/actionType";

type GameReducerStateType = {
  currentGame: string;
  results: {};
};

const initialState: GameReducerStateType = {
  currentGame: "",
  results: {}
};

export const gameReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "POST_GAME_RESULTS": {
      return {
        ...state,
        name: action.payload
      };
    }

    default:
      return state;
  }
};
