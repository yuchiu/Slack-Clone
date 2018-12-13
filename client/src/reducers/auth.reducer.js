import actionTypes from "@/actionTypes";
import { sessionStore } from "@/utils";

const initialState = {
  isUserLoggedIn: false,
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_FETCH_TRY_AUTO_SIGNIN:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case actionTypes.USER_FETCH_SIGNIN:
      newState.isLoading = true;
      return newState;

    case actionTypes.USER_FETCH_SIGNIN_SUCCESS:
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      sessionStore.setUserLoggedOut();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return initialState;

    case actionTypes.ERROR_AUTH:
      newState.isLoading = false;
      return newState;

    default:
      return state;
  }
};
