import actionTypes from "@/actionTypes";
import { sessionStore } from "@/utils";

const initialState = {
  teamList: [],
  currentTeam: {},
  currentTeamMemberList: [],
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_FETCH_TRY_AUTO_SIGNIN:
      if (action.payload.teamList && action.payload.teamList.length > 0) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case actionTypes.USER_FETCH_SIGNIN_SUCCESS:
      if (action.payload.teamList && action.payload.teamList.length > 0) {
        newState.teamList = action.payload.teamList;
        newState.currentTeam = action.payload.teamList[0];
        sessionStore.setTeamId(newState.currentTeam.id);
      }
      return newState;

    case actionTypes.TEAM_FETCH_CREATE:
      newState.isLoading = true;
      return newState;

    case actionTypes.TEAM_FETCH_CREATE_SUCCESS:
      newState.isLoading = false;
      newState.teamList = action.payload.teamList;
      newState.currentTeam = action.payload.team;
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case actionTypes.TEAM_SWITCH:
      newState.currentTeam = state.teamList.find(
        team => team.id === action.payload
      );
      sessionStore.setTeamId(newState.currentTeam.id);
      return newState;

    case actionTypes.TEAM_FETCH_EDIT:
      newState.isLoading = true;
      return newState;

    case actionTypes.TEAM_FETCH_EDIT_SUCCESS:
      newState.isLoading = false;
      newState.currentTeam = action.payload.team;
      return newState;

    case actionTypes.TEAM_FETCH_ASSOCIATED_LIST:
      newState.isLoading = true;
      return newState;

    case actionTypes.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.isLoading = false;
      newState.currentTeamMemberList = action.payload.teamMemberList;
      return newState;

    case actionTypes.TEAM_SOCKET_RECEIVE_NEW_MEMBER:
      newState.currentTeamMemberList = action.payload.teamMemberList;
      return newState;

    case actionTypes.ERROR_TEAM:
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      sessionStore.removeTeamId();
      return initialState;

    default:
      return state;
  }
};
