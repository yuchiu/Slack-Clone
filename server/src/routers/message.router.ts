import * as express from "express";

import { messageController } from "../controllers";
import { authenticationPolicy } from "../middlewares";

const router: express.Router = express.Router();
/* messages routes */
router.get("/", authenticationPolicy, messageController.getAllMessage);
router.get("/:channelId", authenticationPolicy, messageController.getMessage);

export default router;
