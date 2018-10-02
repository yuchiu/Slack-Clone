import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_AUTO_LOGIN_FETCH:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.USER_LOGIN_FETCH:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.USER_LOGOUT_FETCH:
      sessionStore.setUserLoggedOut();
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getIsUserLoggedIn = state => state.authReducer.isUserLoggedIn;

export { getIsUserLoggedIn };
