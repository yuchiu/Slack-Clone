import express from "express";

import {
  userController,
  authController,
  channelController,
  channelMessageController,
  teamController,
  directMessageController
} from "../controllers";
import { authPolicy } from "../policies";

export default app => {
  /* api */
  const apiv1 = express.Router();
  const user = express.Router();
  const auth = express.Router();
  const channel = express.Router();
  const team = express.Router();
  const channelMessage = express.Router();
  const directMessage = express.Router();

  /* routes to api v1 routes  */
  app.use("/api/v1", apiv1);
  apiv1.use("/auth", auth);
  apiv1.use("/users", user);
  apiv1.use("/channels", channel);
  apiv1.use("/teams", team);
  apiv1.use("/direct-messages", directMessage);
  apiv1.use("/channel-messages", channelMessage);

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

  /* channel messages routes */
  channelMessage.get(
    "/:channelId",
    authPolicy.authentication,
    channelMessageController.getChannelMessage
  );

  /* direct messages routes */
};
