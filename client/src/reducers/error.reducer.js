import actionTypes from "@/actionTypes";

const initialState = {
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.ERROR_AUTH:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_USER:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_CHANNEL:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_MESSAGE:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_TEAM:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_CREATE:
      newState.error = action.payload;
      return newState;

    case actionTypes.ERROR_ALL_CLEAR:
      newState.error = "";
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};
