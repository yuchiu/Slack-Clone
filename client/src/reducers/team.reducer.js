import { createSelector } from "reselect";

import constants from "@/constants";
import { sessionStore } from "@/utils";

const initialState = {
  teamList: [],
  currentTeam: {},
  currentTeamMemberList: []
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.USER_FETCH_AUTO_LOGIN:
      if (action.payload.teamList && action.payload.teamList.length > 0) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case constants.USER_FETCH_LOGIN:
      if (action.payload.teamList && action.payload.teamList.length > 0) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case constants.TEAM_FETCH_CREATE:
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.team;
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case constants.TEAM_SWITCH:
      newState.currentTeam = state.teamList.find(
        team => team.id === action.payload
      );
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case constants.TEAM_FETCH_ASSOCIATED_LIST:
      newState.currentTeamMemberList = action.payload.teamMemberList;
      return newState;

    case constants.TEAM_SOCKET_RECEIVE_NEW_MEMBER:
      newState.currentTeamMemberList = action.payload.teamMemberList;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      sessionStore.removeTeamId();
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getCurrentTeam = state => state.teamReducer.currentTeam;

const getCurrentTeamMemberList = state =>
  state.teamReducer.currentTeamMemberList;

const getStateTeamList = state => state.teamReducer.teamList;

/* derived data selectors */
const getTeamList = createSelector(getStateTeamList, teamList =>
  teamList.map(team => {
    const newTeam = { ...team };
    newTeam.initials = team.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2);
    return newTeam;
  })
);

export { getCurrentTeam, getCurrentTeamMemberList, getTeamList };
