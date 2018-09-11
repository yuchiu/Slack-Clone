import constants from "@/constants";

const initialState = {
  teamList: [],
  currentTeam: {},
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.teamList[0];
      return newState;

    case constants.LOGIN_USER:
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.teamList[0];
      return newState;

    case constants.LOGOUT_USER:
      newState.teamList = [];
      newState.currentTeam = {};
      newState.error = "";
      return newState;

    case constants.CREATE_TEAM:
      newState.currentTeam = action.payload.team;
      newState.error = "";
      return newState;

    case constants.CREATE_TEAM_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
