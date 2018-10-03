import { APIV1 } from "./API";
import socket from "./socket";
import { messageAction } from "@/actions";

export default {
  emitSocketMessage: messageData => {
    socket.emit("message-send", messageData);
  },

  /* dispatch dispatchReceivedMessage when new data is received */
  receiveSocketMessage: dispatch => {
    socket.on("message-receive", async data => {
      if (data) dispatch(messageAction.dispatchReceivedMessage(data));
    });
  },

  fetchMoreMessage: async currentMessageData => {
    const response = await APIV1().post(`/messages`, currentMessageData);
    return response;
  }
};
