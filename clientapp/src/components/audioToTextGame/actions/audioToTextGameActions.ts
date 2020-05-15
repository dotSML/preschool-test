export const POST_AUDIO_TO_TEXT_SELECTED_ANSWER = (payload: any) => ({
  type: "POST_AUDIO_TO_TEXT_SELECTED_ANSWER",
  payload
});

export const SET_AUDIO_TO_TEXT_GAME_STATE = (payload: any) => ({
  type: "SET_AUDIO_TO_TEXT_GAME_STATE",
  payload
});

export const SET_AUDIO_TO_TEXT_GAME_STARTED = () => ({
  type: "SET_AUDIO_TO_TEXT_GAME_STARTED",
});

export const SET_AUDIO_TO_TEXT_GAME_COMPLETED = () => ({
  type: "SET_AUDIO_TO_TEXT_GAME_COMPLETED",
});