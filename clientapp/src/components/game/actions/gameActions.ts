export const POST_GAME_RESULTS = (payload: any) => ({
  type: "POST_GAME_RESULTS",
  payload: payload
});

export const SET_GAME_CURRENT_GAME = (payload: number) => ({
  type: "SET_GAME_CURRENT_GAME",
  payload: payload
});


export const INITIALIZE_GAME = (payload: any) => ({
  type: "INITIALIZE_GAME",
  payload: payload
});

export const COMPLETE_GAME = () => ({
  type: "COMPLETE_GAME"
});
