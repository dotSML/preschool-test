export const SET_WEEKDAYS_GAME_STARTED = () => ({
  type: "SET_WEEKDAYS_GAME_STARTED"
});

export const SET_WEEKDAYS_GAME_COMPLETED = () => ({
  type: "SET_WEEKDAYS_GAME_COMPLETED"
});

export const SET_WEEKDAYS_GAME_CURRENT_QUESTION = (payload: number) => ({
  type: "SET_WEEKDAYS_GAME_CURRENT_QUESTION",
  payload: payload
});
