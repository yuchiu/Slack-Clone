import { APIV1 } from "./API";
import socket from "./socket";
import { messageAction } from "@/actions";

export default {
  sendMessage: messageData => {
    socket.emit("sendMessage", messageData);
  },

  /* dispatch messageReceived when new data is received */
  receiveMessage: dispatch => {
    socket.on("receiveMessage", async data => {
      if (data) dispatch(messageAction.messageReceived(data));
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
