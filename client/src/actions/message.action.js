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
  },

  sendChannelMessage: messageData => () => {
    messageService.sendChannelMessage(messageData);
  },

  /* pass in dispatch, let socket.io dispatch channelMessageReceived when data is received */
  receiveChannelMessage: () => dispatch => {
    messageService.receiveChannelMessage(dispatch);
  },

  channelMessageReceived: data => (dispatch, getState) => {
    const { currentChannel } = getState().channelReducer;
    const newData = { ...data };
    newData.currentChannel = currentChannel;
    dispatch({
      type: constants.CHANNEL_MESSAGE_RECEIVED,
      payload: newData
    });
  },

  clearSocketConnection: () => dispatch => {
    messageService.clearSocketConnection();
    dispatch({
      type: constants.CLEAR_SOCKET_CONNECTION
    });
  }
};
