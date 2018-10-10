import * as express from "express";

import { teamController } from "../controllers";
import { authenticationPolicy } from "../middlewares";

const router = express.Router();

/* teams routes */
router.get("/", authenticationPolicy, teamController.getAllTeam);
router.get("/:teamId", authenticationPolicy, teamController.getTeamData);
router.post("/", authenticationPolicy, teamController.createTeam);

export default router;
