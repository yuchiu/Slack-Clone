import {
  channelMessageController,
  directMessageController
} from "../controllers";

export default io => {
  io.on("connection", socket => {
    console.log("socket io connected");
    socket.on("sendMsg", async data => {
      const response = await channelMessageController.createMessage(data);
      console.log(response);
      io.emit("receiveMsg", response);
    });
  });
};
