import io from "socket.io-client";

import { APIV1 } from "./API";
import { messageAction } from "@/actions";

const socket = io("ws://localhost:3030");

export default {
  sendChannelMessage: messageData => {
    socket.emit("sendChannelMessage", messageData);
  },

  /* dispatch channelMessageReceived when new data is received */
  receiveChannelMessage: dispatch => {
    socket.on("receiveChannelMessage", data => {
      dispatch(messageAction.channelMessageReceived(data));
    });
  },

  clearSocketConnection: () => {
    socket.off("receiveChannelMessage");
  }
};
