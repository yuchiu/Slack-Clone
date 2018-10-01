import constants from "@/constants";
import { messageService } from "./services";

export default {
  sendMessage: messageData => () => {
    messageService.sendMessage(messageData);
  },

  /* pass in dispatch, let socket.io dispatch messageReceived when data is received */
  receiveMessage: () => dispatch => {
    messageService.receiveMessage(dispatch);
  },

  messageReceived: data => (dispatch, getState) => {
    if (data.error) {
      dispatch({
        type: constants.MESSAGE_ERROR,
        payload: data.meta.message
      });
    }
    if (!data.error) {
      const { currentChannel } = getState().channelReducer;
      const newData = { ...data };
      newData.currentChannel = currentChannel;
      dispatch({
        type: constants.MESSAGE_RECEIVED,
        payload: newData
      });
    }
  },

  clearSocketConnection: () => dispatch => {
    messageService.clearSocketConnection();
    dispatch({
      type: constants.CLEAR_SOCKET_CONNECTION
    });
  },

  fetchMoreMessage: currentMessageData => async dispatch => {
    try {
      const response = await messageService.fetchMoreMessage(
        currentMessageData
      );
      const { data } = response;
      dispatch({
        type: constants.FETCH_MORE_MESSAGE,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MESSAGE_ERROR,
        payload: data.meta.message
      });
    }
  }
};
