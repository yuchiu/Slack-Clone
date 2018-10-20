import constants from "@/constants";

const initialState = {
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.ERROR_AUTH:
      newState.error = action.payload;
      return newState;

    case constants.ERROR_USER:
      newState.error = action.payload;
      return newState;

    case constants.ERROR_CHANNEL:
      newState.error = action.payload;
      return newState;

    case constants.ERROR_MESSAGE:
      newState.error = action.payload;
      return newState;

    case constants.ERROR_TEAM:
      newState.error = action.payload;
      return newState;

    case constants.ERROR_UPLOAD:
      newState.error = action.payload;
      return newState;

    case constants.ERROR_ALL_CLEAR:
      newState.error = "";
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
