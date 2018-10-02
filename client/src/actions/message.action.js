import constants from "@/constants";
import { messageService } from "./services";

export default {
  sendSocketMessage: messageData => () => {
    messageService.sendSocketMessage(messageData);
  },

  /* pass in dispatch, let socket.io dispatch dispatchReceivedMessage when data is received */
  receiveSocketMessage: () => dispatch => {
    messageService.receiveSocketMessage(dispatch);
  },

  dispatchReceivedMessage: data => (dispatch, getState) => {
    if (data.error) {
      dispatch({
        type: constants.ERROR_MESSAGE,
        payload: data.meta.message
      });
    }
    if (!data.error) {
      const { currentChannel } = getState().channelReducer;
      const newData = { ...data };
      newData.currentChannel = currentChannel;
      dispatch({
        type: constants.MESSAGE_RECEIVE_SOCKET,
        payload: newData
      });
    }
  },

  clearSocketConnection: () => dispatch => {
    messageService.clearSocketConnection();
    dispatch({
      type: constants.SOCKET_CONNECTION_CLEAR
    });
  },

  fetchMoreMessage: currentMessageData => async dispatch => {
    try {
      const response = await messageService.fetchMoreMessage(
        currentMessageData
      );
      const { data } = response;
      dispatch({
        type: constants.MESSAGE_MORE_FETCH,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_MESSAGE,
        payload: data.meta.message
      });
    }
  }
};
