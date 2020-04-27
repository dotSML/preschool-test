export const SET_MONTHS_GAME_STARTED = () => ({
  type: "SET_MONTHS_GAME_STARTED"
});

export const SET_MONTHS_GAME_COMPLETED = () => ({
  type: "SET_MONTHS_GAME_COMPLETED"
});

export const SET_MONTHS_GAME_CURRENT_MONTH = (payload: number) => ({
  type: "SET_MONTHS_GAME_CURRENT_MONTH",
  payload: payload
});

export const SET_MONTHS_GAME_NO_MONTHS = (payload: boolean) => ({
  type: "SET_MONTHS_GAME_NO_MONTHS",
  payload: payload
});
