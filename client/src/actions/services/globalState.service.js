import socket from "./socket";

export default {
  clearSocketConnection: () => {
    socket.off("message-receive");
    socket.off("team-receive-new-member");
  }
};
