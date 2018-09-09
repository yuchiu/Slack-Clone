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

  /* append api to app */
  app.use("/api/v1", apiv1);

  /* routes to api v1 routes  */
  apiv1.use("/auth", auth);
  apiv1.use("/users", user);
  apiv1.use("/channels", channel);
  apiv1.use("/teams", team);
  apiv1.use("/direct-messages", directMessage);
  apiv1.use("/channel-messages", channelMessage);

  /* auth routes */
  auth.get("/", authPolicy.tokenAuth, authController.bearerTokenAuth);
  auth.post("/", authPolicy.registerRule, authController.create);
  auth.post("/:username", authController.login);

  /* user routes */
  user.get("/:username", userController.get);
  user.put("/:username", userController.update);
  user.delete("/:username", userController.delete);

  /* teams routes */
  // team.get("/", authPolicy.tokenAuth, teamController.getAll);
  // team.get("/:teamId", authPolicy.tokenAuth, teamController.get);
  // team.post("/", authPolicy.tokenAuth, teamController.create);
  // team.put("/:teamId", authPolicy.tokenAuth, teamController.update);
  // team.delete("/:teamId", authPolicy.tokenAuth, teamController.delete);

  /* channels routes */

  /* direct messages routes */

  /* channel messages routes */
};
