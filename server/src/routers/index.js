import express from "express";

import { userController } from "../controllers";
import { authPolicy } from "../policies";

export default app => {
  /* apiRoutes */
  const apiRoutes = express.Router();
  const userRoutes = express.Router();
  const channelRoutes = express.Router();
  const teamRoutes = express.Router();
  const channelMessageRoutes = express.Router();
  const directMessageRoutes = express.Router();

  /* append apiRoutes to app */

  app.use("/api/v1", apiRoutes);

  /* append user routes to api v1 routes */
  apiRoutes.use("/users", userRoutes);
  userRoutes.post("/", authPolicy.registerRule, userController.createUser);
  userRoutes.post("/:username", userController.loginUser);
  userRoutes.put("/:username", userController.updateUser);
  userRoutes.delete("/:username", userController.deleteUser);
  userRoutes.get("/:username", userController.getUser);
  userRoutes.get(
    "/",
    authPolicy.bearerTokenAuth,
    userController.bearerTokenAuthUser
  );

  /* append channels routes to api v1 routes */
  apiRoutes.use("/channels", channelRoutes);

  /* append teams routes to api v1 routes */
  apiRoutes.use("/teams", teamRoutes);

  /* append direct messages routes to api v1 routes */
  apiRoutes.use("/direct-messages", directMessageRoutes);

  /* append channel messages routes to api v1 routes */
  apiRoutes.use("/channel-messages", channelMessageRoutes);
};
