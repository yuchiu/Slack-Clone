import express from "express";

import {
  userController,
  authController,
  channelController,
  messageGroupController,
  messageController,
  teamController
} from "../controllers";
import { authPolicy } from "../policies";

export default app => {
  /* api */
  const apiv1 = express.Router();
  const user = express.Router();
  const auth = express.Router();
  const channel = express.Router();
  const team = express.Router();
  const message = express.Router();
  const messageGroup = express.Router();

  /* routes to api v1 routes  */
  app.use("/api/v1", apiv1);
  apiv1.use("/auths", auth);
  apiv1.use("/users", user);
  apiv1.use("/channels", channel);
  apiv1.use("/message-groups", messageGroup);
  apiv1.use("/teams", team);
  apiv1.use("/messages", message);

  /* auth routes */
  auth.get("/", authPolicy.authentication, authController.bearerTokenAuth);
  auth.post("/", authPolicy.registerRule, authController.create);
  auth.post("/:username", authController.login);

  /* user routes */
  user.get("/:username", userController.get);
  user.put("/:username", userController.update);
  user.delete("/:username", userController.delete);

  /* teams routes */
  team.post("/", authPolicy.authentication, teamController.create);
  team.post(
    "/members",
    authPolicy.authentication,
    teamController.addTeamMember
  );
  team.get(
    "/:teamId",
    authPolicy.authentication,
    teamController.getTeamAssociatedList
  );

  /* channels routes */
  channel.post("/", authPolicy.authentication, channelController.create);

  /* messageGroup routes */
  // messageGroup.post("/", console.log("create message group"));

  /* messages routes */
  message.get(
    "/channels/:channelId",
    authPolicy.authentication,
    messageController.getChannelMessage
  );
  // message.get(
  //   "/message-groups/:userId",
  //   console.log("get message group's message")
  // );
};
