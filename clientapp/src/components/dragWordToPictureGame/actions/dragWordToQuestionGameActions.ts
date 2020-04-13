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
