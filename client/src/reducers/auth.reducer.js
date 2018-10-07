import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_FETCH_AUTO_LOGIN:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.USER_FETCH_LOGIN:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.USER_FETCH_LOGOUT:
      sessionStore.setUserLoggedOut();
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getIsUserLoggedIn = state => state.authReducer.isUserLoggedIn;

export { getIsUserLoggedIn };
