import { apiV1, socket } from "./API";
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
    const response = await apiV1().get(
      `/messages/${currentMessageData.channelId}`,
      {
        params: {
          offset: currentMessageData.offset
        }
      }
    );
    return response;
  }
};
