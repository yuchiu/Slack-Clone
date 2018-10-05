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
  user.get("/", authenticationPolicy, userController.tryAutoLogin);
  user.put("/", authenticationPolicy, userController.updateUser);
  user.get("/logouts", userController.logout);
  user.post("/registers", registerPolicy, userController.register);
  user.post("/logins", userController.login);

  /* teams routes */
  team.post("/", authenticationPolicy, teamController.create);
  team.get(
    "/:teamId",
    authenticationPolicy,
    teamController.fetchTeamAssociatedList
  );

  /* channels routes */
  channel.post("/", authenticationPolicy, channelController.create);
  channel.put("/", authenticationPolicy, channelController.updateChannel);
  channel.get(
    "/:channelId",
    authenticationPolicy,
    channelController.getChannelAssociatedList
  );

  /* messages routes */
  message.post("/", authenticationPolicy, messageController.getMoreMessage);
};
