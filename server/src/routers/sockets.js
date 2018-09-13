import {
  channelMessageController,
  directMessageController
} from "../controllers";

export default io => {
  io.on("connection", socket => {
    console.log("socket io connected");
    socket.on("sendChannelMessage", async data => {
      const response = await channelMessageController.createMessage(data);
      io.emit("receiveChannelMessage", response);
    });
  });
};
