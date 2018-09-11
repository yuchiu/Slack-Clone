import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  teamList: [],
  currentTeam: {},
  currentTeamMembers: [],
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      if (action.payload.teamList) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case constants.LOGIN_USER:
      if (action.payload.teamList) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case constants.LOGOUT_USER:
      newState.teamList = [];
      newState.currentTeam = {};
      newState.error = "";
      newState.currentTeamMembers = [];
      sessionStore.removeTeamId();
      return newState;

    case constants.CREATE_TEAM:
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.team;
      newState.error = "";
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.error = "";
      newState.currentTeamMembers = action.payload.teamMemberList;
      return newState;

    case constants.TEAM_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
