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
  switchChannel: channelId => async dispatch => {
    dispatch({
      type: constants.SWITCH_CHANNEL,
      payload: channelId
    });
  },
  getChannelAssociatedList: channelId => async dispatch => {
    try {
      const response = await channelService.getChannelAssociatedList(channelId);
      const { data } = response;
      dispatch({
        type: constants.GET_CHANNEL_ASSOCIATED_LIST,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MESSAGE_ERROR,
        payload: data
      });
    }
  },
  getCurrentChannel: params => async dispatch => {
    dispatch({
      type: constants.GET_CURRENT_CHANNEL,
      payload: params
    });
  }
};
