import constants from "@/constants";
import { channelService } from "./services";

export default {
  fetchCreateChannel: channelFormInfo => async dispatch => {
    try {
      const response = await channelService.fetchCreateChannel(channelFormInfo);
      const { data } = response;
      dispatch({
        type: constants.CHANNEL_FETCH_CREATE,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_CHANNEL,
        payload: data.meta.message
      });
    }
  },
  switchChannel: channelId => async dispatch => {
    dispatch({
      type: constants.CHANNEL_SWITCH,
      payload: channelId
    });
  },
  fetchGetChannelAssociatedList: channelId => async dispatch => {
    try {
      const response = await channelService.fetchGetChannelAssociatedList(
        channelId
      );
      const { data } = response;
      dispatch({
        type: constants.CHANNEL_FETCH_ASSOCIATED_LIST,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_CHANNEL,
        payload: data.meta.message
      });
    }
  },
  fetchEditChannel: editChannelData => async dispatch => {
    try {
      const response = await channelService.fetchEditChannel(editChannelData);
      const { data } = response;
      dispatch({
        type: constants.CHANNEL_FETCH_EDIT,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_CHANNEL,
        payload: data.meta.message
      });
    }
  },
  getCurrentChannel: params => async dispatch => {
    dispatch({
      type: constants.CHANNEL_GET_CURRENT,
      payload: params
    });
  }
};
