import * as express from "express";

import { teamController } from "../controllers";
import { authenticationPolicy, authorizationPolicy } from "../middlewares";

const router: express.Router = express.Router();

/* teams routes */
router.get("/", authenticationPolicy, teamController.getAllTeam);
router.get("/:teamId", authenticationPolicy, teamController.getTeamData);
router.post("/", authenticationPolicy, teamController.createTeam);
router.put(
  "/",
  authenticationPolicy,
  authorizationPolicy,
  teamController.updateTeam
);

export default router;
