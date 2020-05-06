export const SET_DOG_CANVAS_GAME_STARTED = () => ({
  type: "SET_DOG_CANVAS_GAME_STARTED"
});

export const SET_DOG_CANVAS_GAME_COMPLETED = () => ({
  type: "SET_DOG_CANVAS_GAME_COMPLETED"
});

export const SET_DOG_CANVAS_GAME_CURRENT_QUESTION = (payload: number) => ({
  type: "SET_DOG_CANVAS_GAME_CURRENT_QUESTION",
  payload: payload
});

export const SET_DOG_CANVAS_GAME_SELECTED_ANSWER = (payload: any | null) => ({
  type: "SET_DOG_CANVAS_GAME_SELECTED_ANSWER",
  payload: payload
});
