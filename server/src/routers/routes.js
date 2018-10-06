import express from "express";

import {
  userController,
  channelController,
  messageController,
  teamController
} from "../controllers";
import {
  authenticationPolicy,
  authorizationPolicy,
  registerPolicy
} from "../middlewares";

export default app => {
  /* api */
  const apiv1 = express.Router();
  const user = express.Router();
  const channel = express.Router();
  const team = express.Router();
  const message = express.Router();

  /* routes to api v1 routes  */
  app.use("/api/v1", apiv1);
  apiv1.use("/users", user);
  apiv1.use("/channels", channel);
  apiv1.use("/teams", team);
  apiv1.use("/messages", message);

  /* user routes */
  user.get("/auths", authenticationPolicy, userController.tryAutoLogin);
  user.get("/", authenticationPolicy, userController.getUser);
  user.get("/:userId", authenticationPolicy, userController.getAllUsers);
  user.put("/:userId", authenticationPolicy, userController.updateUser);
  user.post("/registers", registerPolicy, userController.createUser);
  user.post("/logins", userController.login);
  user.get("/logouts", userController.logout);

  /* teams routes */
  team.get("/", authenticationPolicy, teamController.getAllTeam);
  team.get("/:teamId", authenticationPolicy, teamController.getTeamData);
  team.post("/", authenticationPolicy, teamController.createTeam);

  /* channels routes */
  channel.get(authenticationPolicy, channelController.getAllChannel);
  channel.get(
    "/:channelId",
    authenticationPolicy,
    channelController.getChannelData
  );
  channel.post("/", authenticationPolicy, channelController.createChannel);
  channel.put("/", authenticationPolicy, channelController.updateChannel);

  /* messages routes */
  message.get(authenticationPolicy, messageController.getAllMessage);
  message.get(
    "/:channelId",
    authenticationPolicy,
    messageController.getMessage
  );
};
