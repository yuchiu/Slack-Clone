import io from "socket.io-client";

import { APIV1 } from "./API";
import { messageAction } from "@/actions";

const socket = io("ws://localhost:3030");

export default {
  sendMessage: messageData => {
    socket.emit("sendMessage", messageData);
  },

  /* dispatch messageReceived when new data is received */
  receiveMessage: dispatch => {
    socket.on("receiveMessage", data => {
      dispatch(messageAction.messageReceived(data));
    });
  },

  clearSocketConnection: () => {
    socket.off("receiveMessage");
  }
};
