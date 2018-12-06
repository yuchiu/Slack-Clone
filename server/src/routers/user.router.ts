import * as express from "express";

import { userController } from "../controllers";
import { authenticationPolicy, registerPolicy } from "../middlewares";

const router: express.Router = express.Router();

/* user routes */
router.get("/auth", authenticationPolicy, userController.tryAutoSingInUser);
router.post("/oauth", userController.signInOauth);
router.post("/signup", registerPolicy, userController.signUpUser);
router.post("/signin", userController.singInUser);
router.get("/signout", userController.signOutUser);

router.get("/", authenticationPolicy, userController.getAllUsers);
router.get("/:userId", authenticationPolicy, userController.getUser);
router.put("/:userId", authenticationPolicy, userController.updateUser);

export default router;
