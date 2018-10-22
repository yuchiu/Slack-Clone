import actionTypes from "@/actionTypes";
import { channelService } from "./services";

export default {
  /**
   * Local
   */
  switchChannel: channelId => async dispatch => {
    dispatch({
      type: actionTypes.CHANNEL_SWITCH,
      payload: channelId
    });
  },

  /**
   * fetch API with Axios
   */
  fetchCreateChannel: channelFormInfo => async dispatch => {
    dispatch({
      type: actionTypes.CHANNEL_FETCH_CREATE
    });
    try {
      const response = await channelService.fetchCreateChannel(channelFormInfo);
      const { data } = response;
      dispatch({
        type: actionTypes.CHANNEL_FETCH_CREATE_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_CHANNEL,
        payload: data.meta.message
      });
    }
  },
  fetchGetChannelAssociatedList: channelId => async dispatch => {
    dispatch({
      type: actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST
    });
    try {
      const response = await channelService.fetchGetChannelAssociatedList(
        channelId
      );
      const { data } = response;
      dispatch({
        type: actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_CHANNEL,
        payload: data.meta.message
      });
    }
  },
  fetchEditChannel: editChannelData => async dispatch => {
    dispatch({
      type: actionTypes.CHANNEL_FETCH_EDIT
    });
    try {
      const response = await channelService.fetchEditChannel(editChannelData);
      const { data } = response;
      dispatch({
        type: actionTypes.CHANNEL_FETCH_EDIT_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_CHANNEL,
        payload: data.meta.message
      });
    }
  }
};
