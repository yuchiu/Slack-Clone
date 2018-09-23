import constants from "@/constants";
import { localStore, sessionStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.LOGIN_USER:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      localStore.authenticateUser(action.payload);
      return newState;

    case constants.LOGOUT_USER:
      sessionStore.setUserLoggedOut();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      localStore.deauthenticateUser();
      return newState;

    default:
      return state;
  }
};

/* state selectors */
const getIsUserLoggedIn = state => state.authReducer.isUserLoggedIn;

export { getIsUserLoggedIn };
