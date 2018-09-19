import constants from "@/constants";

const initialState = {
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTH_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.CHANNEL_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.MESSAGE_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.TEAM_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.UPLOAD_ERROR:
      newState.error = action.payload;
      return newState;

    case constants.CLEAR_ERROR:
      newState.error = "";
      return newState;

    default:
      return state;
  }
};
