import constants from "@/constants";
import { localStore, sessionStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false,
  error: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.AUTH_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.AUTO_LOGIN:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case constants.LOGIN_USER:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      localStore.authenticateUser(action.payload);
      newState.error = "";
      return newState;

    case constants.LOGOUT_USER:
      sessionStore.setUserLoggedOut();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      localStore.deauthenticateUser();
      newState.error = "";
      return newState;
    default:
      return state;
  }
};
