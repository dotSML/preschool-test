export const SET_ANALOGUE_CLOCK_GAME_STARTED = () => ({
  type: "SET_ANALOGUE_CLOCK_GAME_STARTED"
});

export const SET_ANALOGUE_CLOCK_GAME_COMPLETED = () => ({
  type: "SET_ANALOGUE_CLOCK_GAME_COMPLETED"
});

export const SET_ANALOGUE_CLOCK_GAME_CURRENT_QUESTION = (payload: number) => ({
  type: "SET_ANALOGUE_CLOCK_GAME_CURRENT_QUESTION",
  payload: payload
});

export const SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER = (
  payload: any | null
) => ({
  type: "SET_ANALOGUE_CLOCK_GAME_SELECTED_ANSWER",
  payload: payload
});
