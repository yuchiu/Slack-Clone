import constants from "@/constants";
import { channelService } from "./services";

export default {
  createChannel: channelFormInfo => async dispatch => {
    try {
      const response = await channelService.createChannel(channelFormInfo);
      const { data } = response;
      dispatch({
        type: constants.CREATE_CHANNEL,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.CHANNEL_ERROR,
        payload: data
      });
    }
  },
  getChannel: channelId => async dispatch => {
    dispatch({
      type: constants.GET_CHANNEL,
      payload: channelId
    });
  }
};
