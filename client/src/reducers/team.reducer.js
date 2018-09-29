import { createSelector } from "reselect";

import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  teamList: [],
  currentTeam: {},
  currentTeamMembers: []
};
const getCurrentTeamFromParams = (teamList, currentTeam, teamIdFromParams) => {
  /* return default current team if params is empty */
  if (!teamIdFromParams) {
    return currentTeam;
  }
  /* return current team using params */
  const currentTeamFromParams = teamList.find(
    team => team.id === parseInt(teamIdFromParams, 10)
  );
  return currentTeamFromParams;
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      if (action.payload.teamList && action.payload.teamList.length > 0) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case constants.LOGIN_USER:
      if (action.payload.teamList && action.payload.teamList.length > 0) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case constants.CREATE_TEAM:
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.team;
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case constants.SWITCH_TEAM:
      newState.currentTeam = state.teamList.find(
        team => team.id === action.payload
      );
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case constants.GET_CURRENT_TEAM:
      newState.currentTeam = getCurrentTeamFromParams(
        state.teamList,
        state.currentTeam,
        action.payload.teamId
      );
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.currentTeamMembers = action.payload.teamMemberList;
      return newState;

    case constants.ADD_TEAM_MEMBER:
      newState.currentTeamMembers = action.payload.teamMemberList;
      return newState;

    case constants.LOGOUT_USER:
      sessionStore.removeTeamId();
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getCurrentTeam = state => state.teamReducer.currentTeam;

const getCurrentTeamMembers = state => state.teamReducer.currentTeamMembers;

const getStateTeamList = state => state.teamReducer.teamList;

/* derived data selectors */
const getTeamList = createSelector(getStateTeamList, teamList =>
  teamList.map(team => {
    const newTeam = { ...team };
    newTeam.initials = team.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 3);
    return newTeam;
  })
);

export { getCurrentTeam, getCurrentTeamMembers, getTeamList };
