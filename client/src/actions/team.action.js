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
  fetchAddTeamMember: addMemberInfo => async dispatch => {
    try {
      const response = await teamService.fetchAddTeamMember(addMemberInfo);
      const { data } = response;
      dispatch({
        type: constants.TEAM_MEMBER_ADD_FETCH,
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
  }
};
