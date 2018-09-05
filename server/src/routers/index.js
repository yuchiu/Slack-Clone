import express from "express";

import { userController } from "../controllers";
import { authPolicy } from "../policies";

export default app => {
  /* apiRoutes */
  const apiRoutes = express.Router();
  const userRoutes = express.Router();
  const newsRoutes = express.Router();

  /* append apiRoutes to app */

  app.use("/api/v1", apiRoutes);

  /* append user routes to api v1 routes */
  apiRoutes.use("/users", userRoutes);

  userRoutes.get(
    "/",
    authPolicy.bearerTokenAuth,
    userController.bearerTokenAuthUser
  );
  userRoutes.get("/:username", userController.getUser);

  userRoutes.post("/", authPolicy.registerRule, userController.createUser);
  userRoutes.post("/:username", userController.loginUser);
  userRoutes.put("/:username", userController.updateUser);
  userRoutes.delete("/:username", userController.deleteUser);
};
