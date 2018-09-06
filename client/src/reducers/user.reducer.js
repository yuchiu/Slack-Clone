import constants from "@/constants";
import { localStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false,
  user: {},
  error: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.AUTH_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.AUTO_LOGIN:
      newState.isUserLoggedIn = true;
      newState.user = action.payload.user;
      return newState;

    case constants.LOGIN_USER:
      localStore.authenticateUser(action.payload);
      newState.isUserLoggedIn = true;
      newState.user = action.payload.user;
      newState.error = "";
      return newState;

    case constants.LOGOUT_USER:
      localStore.deauthenticateUser();
      newState.isUserLoggedIn = false;
      newState.user = {};
      newState.error = "";
      return newState;
    default:
      return state;
  }
};
