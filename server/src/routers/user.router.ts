import * as express from "express";

import { userController } from "../controllers";
import { authenticationPolicy, registerPolicy } from "../middlewares";

const router: express.Router = express.Router();

/* user routes */
router.get("/auths", authenticationPolicy, userController.tryAutoLogin);
router.get("/", authenticationPolicy, userController.getUser);
router.get("/:userId", authenticationPolicy, userController.getAllUsers);
router.put("/:userId", authenticationPolicy, userController.updateUser);
router.post("/registers", registerPolicy, userController.createUser);
router.post("/logins", userController.login);
router.get("/logouts", userController.logout);

export default router;
