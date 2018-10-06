import { socket } from "./API";

export default {
  clearSocketConnection: () => {
    socket.off("message-receive");
    socket.off("team-receive-new-member");
  }
};
