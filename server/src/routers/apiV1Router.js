import express from "express";
import channelRouter from "./channel.router";
import messageRouter from "./message.router";
import teamRouter from "./team.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/channels", channelRouter);
router.use("/teams", teamRouter);
router.use("/messages", messageRouter);

export default router;
