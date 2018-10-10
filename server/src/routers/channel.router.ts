import * as express from "express";

import { channelController } from "../controllers";
import { authenticationPolicy } from "../middlewares";

const router: express.Router = express.Router();
/* channels routes */
router.get("/", authenticationPolicy, channelController.getAllChannel);
router.get(
  "/:channelId",
  authenticationPolicy,
  channelController.getChannelData
);
router.post("/", authenticationPolicy, channelController.createChannel);
router.put("/", authenticationPolicy, channelController.updateChannel);

export default router;
