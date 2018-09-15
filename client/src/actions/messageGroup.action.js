import constants from "@/constants";
import { messageGroupService } from "./services";

export default {
  createMessageGroup: messageGroupFormInfo => async dispatch => {
    try {
      const response = await messageGroupService.createMessageGroup(
        messageGroupFormInfo
      );
      const { data } = response;
      dispatch({
        type: constants.CREATE_MESSAGE_GROUP,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MESSAGE_GROUP_ERROR,
        payload: data
      });
    }
  }
};
