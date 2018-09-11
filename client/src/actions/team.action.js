import constants from "@/constants";
import { teamService } from "./services";

export default {
  createTeam: teamFormInfo => async dispatch => {
    try {
      const response = await teamService.createTeam(teamFormInfo);
      const { data } = response;
      dispatch({
        type: constants.CREATE_TEAM,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.CREATE_TEAM_ERROR,
        payload: data
      });
    }
  }
};
