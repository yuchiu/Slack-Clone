import constants from "@/constants";
import { messageService } from "./services";

export default {
  getChannelMessageList: channelId => async dispatch => {
    try {
      const response = await messageService.getChannelMessageList(channelId);
      const { data } = response;
      dispatch({
        type: constants.GET_CHANNEL_MESSAGE_LIST,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MESSAGE_ERROR,
        payload: data
      });
    }
  }
};
