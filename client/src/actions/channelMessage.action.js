import constants from "@/constants";
import { channelService } from "./services";

export default {
  getChannelMessageList: channelId => async dispatch => {
    try {
      const response = await channelService.createChannel(channelId);
      const { data } = response;
      dispatch({
        type: constants.GET_CHANNEL_MESSAGE_LIST,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.CHANNEL_MESSAGE_ERROR,
        payload: data
      });
    }
  }
};
