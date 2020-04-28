export const SET_CALCULATION_GAME_STARTED = () => ({
  type: "SET_CALCULATION_GAME_STARTED"
});

export const SET_CALCULATION_GAME_COMPLETED = () => ({
  type: "SET_CALCULATION_GAME_COMPLETED"
});

export const SET_CALCULATION_GAME_CURRENT_QUESTION = (payload: number) => ({
  type: "SET_CALCULATION_GAME_CURRENT_QUESTION",
  payload: payload
});

export const SET_CALCULATION_GAME_CHOSEN_ANSWER = (payload: number) => ({
  type: "SET_CALCULATION_GAME_CHOSEN_ANSWER",
  payload: payload
});
