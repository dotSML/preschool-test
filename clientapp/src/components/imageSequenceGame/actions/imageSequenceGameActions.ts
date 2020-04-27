export const SET_IMAGE_SEQUENCE_GAME_STARTED = () => ({
  type: "SET_IMAGE_SEQUENCE_GAME_STARTED"
});

export const SET_IMAGE_SEQUENCE_GAME_COMPLETED = () => ({
  type: "SET_IMAGE_SEQUENCE_GAME_COMPLETED"
});

export const SET_IMAGE_SEQUENCE_GAME_CURRENT_QUESTION = (payload: number) => ({
  type: "SET_IMAGE_SEQUENCE_GAME_CURRENT_QUESTION",
  payload: payload
});
