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
      newState.isLoading = true;
      return newState;

    case constants.USER_FETCH_EDIT_SUCCESS:
      newState.isLoading = false;
      newState.currentUser = action.payload.user;
      return newState;

    case constants.ERROR_USER:
      newState.isLoading = false;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getCurrentUser = state => state.userReducer.currentUser;

const getUserIsLoading = state => state.userReducer.isLoading;

const getUsername = state => {
  const currentUser = getCurrentUser(state);
  return currentUser.username;
};

export { getCurrentUser, getUserIsLoading, getUsername };
