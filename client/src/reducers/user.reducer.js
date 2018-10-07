import constants from "@/constants";

const initialState = {
  currentUser: {}
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_FETCH_AUTO_LOGIN:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_FETCH_LOGIN:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_FETCH_EDIT:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getCurrentUser = state => state.userReducer.currentUser;

const getUsername = state => {
  const currentUser = getCurrentUser(state);
  return currentUser.username;
};

export { getCurrentUser, getUsername };
