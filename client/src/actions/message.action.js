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

  sendFile: file => () => {
    console.log(file);
  },

  messageReceived: data => (dispatch, getState) => {
    const { currentChannel } = getState().channelReducer;
    const newData = { ...data };
    newData.currentChannel = currentChannel;
    dispatch({
      type: constants.MESSAGE_RECEIVED,
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
