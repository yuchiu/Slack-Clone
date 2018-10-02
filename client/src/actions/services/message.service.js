import { APIV1 } from "./API";
import socket from "./socket";
import { messageAction } from "@/actions";

export default {
  sendSocketMessage: messageData => {
    socket.emit("sendMessage", messageData);
  },

  /* dispatch dispatchReceivedMessage when new data is received */
  receiveSocketMessage: dispatch => {
    socket.on("receiveMessage", async data => {
      if (data) dispatch(messageAction.dispatchReceivedMessage(data));
    });
  },
  clearSocketConnection: () => {
    socket.off("receiveMessage");
  },

  fetchMoreMessage: async currentMessageData => {
    const response = await APIV1().post(`/messages`, currentMessageData);
    return response;
  }
};
