import actionTypes from "@/actionTypes";
import { teamService } from "./services";

export default {
  /**
   * Local
   */
  switchTeam: teamId => async dispatch => {
    dispatch({
      type: actionTypes.TEAM_SWITCH,
      payload: teamId
    });
  },

  /**
   * fetch API with Axios
   */
  fetchCreateTeam: teamFormInfo => async dispatch => {
    dispatch({
      type: actionTypes.TEAM_FETCH_CREATE
    });
    try {
      const response = await teamService.fetchCreateTeam(teamFormInfo);
      const { data } = response;
      dispatch({
        type: actionTypes.TEAM_FETCH_CREATE_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },

  fetchTeamAssociatedList: teamId => async dispatch => {
    dispatch({
      type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST
    });
    try {
      const response = await teamService.fetchTeamAssociatedList(teamId);
      const { data } = response;
      dispatch({
        type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },

  fetchEditTeam: editTeamData => async dispatch => {
    dispatch({
      type: actionTypes.TEAM_FETCH_EDIT
    });
    try {
      const response = await teamService.fetchEditTeam(editTeamData);
      const { data } = response;
      dispatch({
        type: actionTypes.TEAM_FETCH_EDIT_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },

  /**
   * Web Socket with Socket.io
   */
  emitSocketAddTeamMember: addMemberData => {
    teamService.emitSocketAddTeamMember(addMemberData);
  },

  // pass in dispatch, let socket.io dispatch dispatchReceivedTeamMember when data is received
  receiveSocketNewTeamMember: () => dispatch => {
    teamService.receiveSocketNewTeamMember(dispatch);
  },

  dispatchReceivedTeamMember: data => dispatch => {
    if (data.meta.type === "success") {
      dispatch({
        type: actionTypes.TEAM_SOCKET_RECEIVE_NEW_MEMBER,
        payload: data
      });
    } else {
      dispatch({
        type: actionTypes.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  }
};
