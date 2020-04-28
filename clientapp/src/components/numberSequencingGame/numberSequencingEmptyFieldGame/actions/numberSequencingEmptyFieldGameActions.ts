export const SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_STARTED = () => ({
  type: "SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_STARTED"
});

export const SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_COMPLETED = () => ({
  type: "SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_COMPLETED"
});

export const SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_CURRENT_QUESTION = (
  payload: number
) => ({
  type: "SET_NUMBER_SEQUENCING_EMPTY_FIELD_GAME_CURRENT_QUESTION",
  payload: payload
});
