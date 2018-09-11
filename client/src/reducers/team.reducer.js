import constants from "@/constants";

const initialState = {
  teamList: [],
  currentTeam: {},
  error: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.AUTO_LOGIN:
      newState.teams = action.payload.teams;
      return newState;

    case constants.LOGIN_USER:
      newState.teams = action.payload.teams;
      return newState;

    case constants.LOGOUT_USER:
      newState.teams = [];
      newState.error = "";
      return newState;

    case constants.CREATE_TEAM_ERROR:
      newState.error = action.payload.error;
      return newState;

    case constants.CREATE_TEAM:
      newState.team = action.payload;
      newState.error = "";
      return newState;

    default:
      return state;
  }
};
