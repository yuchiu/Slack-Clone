import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false,
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_FETCH_AUTO_LOGIN:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.USER_FETCH_LOGIN:
      newState.isLoading = true;
      return newState;

    case constants.USER_FETCH_LOGIN_SUCCESS:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      newState.isLoading = false;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      sessionStore.setUserLoggedOut();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return initialState;

    case constants.ERROR_AUTH:
      newState.error = action.payload;
      newState.isLoading = false;
      return newState;

    default:
      return state;
  }
};

/* state selectors */
const getIsUserLoggedIn = state => state.authReducer.isUserLoggedIn;
const getAuthIsLoading = state => state.authReducer.isLoading;

export { getIsUserLoggedIn, getAuthIsLoading };
