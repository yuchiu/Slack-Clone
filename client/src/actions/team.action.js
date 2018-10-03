import constants from "@/constants";
import { teamService } from "./services";

export default {
  fetchCreateTeam: teamFormInfo => async dispatch => {
    try {
      const response = await teamService.fetchCreateTeam(teamFormInfo);
      const { data } = response;
      dispatch({
        type: constants.TEAM_CREATE_FETCH,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },

  switchTeam: teamId => async dispatch => {
    dispatch({
      type: constants.TEAM_SWITCH,
      payload: teamId
    });
  },
  getCurrentTeam: params => async dispatch => {
    dispatch({
      type: constants.TEAM_CURRENT_GET,
      payload: params
    });
  },

  fetchTeamAssociatedList: teamId => async dispatch => {
    try {
      const response = await teamService.fetchTeamAssociatedList(teamId);
      const { data } = response;
      dispatch({
        type: constants.TEAM_ASSOCIATED_LIST_FETCH,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },
  emitSocketAddTeamMember: addMemberData => {
    teamService.emitSocketAddTeamMember(addMemberData);
  },

  /* pass in dispatch, let socket.io dispatch dispatchReceivedTeamMemberl when data is received */
  receiveSocketNewTeamMember: () => dispatch => {
    teamService.receiveSocketNewTeamMember(dispatch);
  },

  dispatchReceivedTeamMemberl: data => dispatch => {
    if (data.meta.type === "success") {
      dispatch({
        type: constants.TEAM_NEW_MEMBER_RECEIVE_SOCKET,
        payload: data
      });
    } else {
      dispatch({
        type: constants.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  }
};
