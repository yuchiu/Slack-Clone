import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  teamList: [],
  currentTeam: {},
  isTeamCreated: false,
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      if (action.payload.teamList) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamToTrue();
      }
      return newState;

    case constants.LOGIN_USER:
      if (action.payload.teamList) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamToTrue();
      }
      return newState;

    case constants.LOGOUT_USER:
      newState.teamList = [];
      newState.currentTeam = {};
      newState.error = "";
      sessionStore.setTeamToFalse();
      return newState;

    case constants.CREATE_TEAM:
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.team;
      newState.error = "";
      sessionStore.setTeamToTrue();
      return newState;

    case constants.TEAM_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
