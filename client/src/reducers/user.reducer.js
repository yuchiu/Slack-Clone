import constants from "@/constants";

const initialState = {
  user: {},
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      newState.user = action.payload.user;
      newState.teams = action.payload.teams;
      return newState;

    case constants.LOGIN_USER:
      newState.user = action.payload.user;
      newState.teams = action.payload.teams;
      newState.error = "";
      return newState;

    case constants.LOGOUT_USER:
      newState.user = {};
      newState.teams = [];
      newState.error = "";
      return newState;
    default:
      return state;
  }
};
