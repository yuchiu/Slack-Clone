import constants from "@/constants";
import { messageService } from "./services";

export default {
  /**
   * fetch API with Axios
   */
  fetchMoreMessage: currentMessageData => async dispatch => {
    dispatch({
      type: constants.MESSAGE_FETCH_MORE
    });
    try {
      const response = await messageService.fetchMoreMessage(
        currentMessageData
      );
      const { data } = response;
      dispatch({
        type: constants.MESSAGE_FETCH_MORE_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_MESSAGE,
        payload: data.meta.message
      });
    }
  },

  /**
   * Web Socket with Socket.io
   */
  emitSocketMessage: messageData => () => {
    messageService.emitSocketMessage(messageData);
  },

  // pass in dispatch, let socket.io dispatch dispatchReceivedMessage when data is received
  receiveSocketMessage: () => dispatch => {
    messageService.receiveSocketMessage(dispatch);
  },

  dispatchReceivedMessage: data => (dispatch, getState) => {
    console.log(data);
    if (data.meta.type === "success") {
      const { currentChannel } = getState().channelReducer;
      const newData = { ...data };
      newData.currentChannel = currentChannel;
      dispatch({
        type: constants.MESSAGE_SOCKET_RECEIVE,
        payload: newData
      });
    } else {
      dispatch({
        type: constants.ERROR_MESSAGE,
        payload: data.meta.message
      });
    }
  }
};
