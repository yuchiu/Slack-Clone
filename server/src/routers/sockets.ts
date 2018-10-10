import { messageController, teamController } from "../controllers";

export default io => {
  io.on("connection", socket => {
    socket.on("message-send", async data => {
      const response = await messageController.createMessage(data);
      io.emit("message-receive", response);
    });

    socket.on("team-new-member", async data => {
      const response = await teamController.addTeamMember(data);
      io.emit("team-receive-new-member", response);
    });
  });
};
