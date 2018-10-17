import constants from "@/constants";

const initialState = {
  currentUser: {},
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_FETCH_AUTO_LOGIN:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_FETCH_LOGIN_SUCCESS:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_FETCH_EDIT:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    case constants.ERROR_USER:
      newState.error = action.payload;
      newState.isLoading = false;
      return newState;

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
