export const SET_DRAG_WORD_TO_PICTURE_GAME_START_STATE = (
  payload: boolean
) => ({
  type: "SET_DRAG_WORD_TO_PICTURE_GAME_START_STATE",
  payload: payload
});

export const SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED = (
  payload: boolean
) => ({
  type: "SET_DRAG_WORD_TO_PICTURE_GAME_SET_GAME_COMPLETED",
  payload: payload
});

export const SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION = (
  payload: number
) => ({
  type: "SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_QUESTION",
  payload: payload
});

export const RESET_DRAG_WORD_TO_PICTURE_GAME_STATE = () => ({
  type: "RESET_DRAG_WORD_TO_PICTURE_GAME_STATE"
});

export const SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT = (
  payload: number
) => ({
  type: "SET_DRAG_WORD_TO_PICTURE_GAME_CURRENT_ASSIGNMENT",
  payload: payload
});

export const SET_MATCH_WORD_WITH_PICTURE_GAME_CURRENT_QUESTION = (
  payload: number
) => ({
  type: "SET_MATCH_WORD_WITH_PICTURE_GAME_CURRENT_QUESTION",
  payload: payload
});

export const SET_MATCH_WORD_WITH_PICTURE_GAME_COMPLETED = (
  payload: boolean
) => ({
  type: "SET_MATCH_WORD_WITH_PICTURE_GAME_COMPLETED",
  payload: payload
});

export const SET_MATCH_OPPOSITE_WORDS_GAME_QUESTIONS = (
  payload: Array<any>
) => ({
  type: "SET_MATCH_OPPOSITE_WORDS_GAME_QUESTIONS",
  payload: payload
});

export const SET_MATCH_OPPOSITE_WORDS_GAME_OPTION_SLOTS = (
  payload: Array<string>
) => ({
  type: "SET_MATCH_OPPOSITE_WORDS_GAME_OPTION_SLOTS",
  payload: payload
});

export const SET_MATCH_OPPOSITE_WORDS_GAME_CURRENT_QUESTION = (
  payload: number
) => ({
  type: "SET_MATCH_OPPOSITE_WORDS_GAME_CURRENT_QUESTION",
  payload: payload
});

export const SET_MATCH_OPPOSITE_WORDS_GAME_RESULTS = (payload: any) => ({
  type: "SET_MATCH_OPPOSITE_WORDS_GAME_RESULTS",
  payload: payload
});
