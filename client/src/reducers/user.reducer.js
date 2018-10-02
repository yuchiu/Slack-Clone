import constants from "@/constants";

const initialState = {
  currentUser: {}
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_AUTO_LOGIN_FETCH:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_LOGIN_FETCH:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_LOGOUT_FETCH:
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
