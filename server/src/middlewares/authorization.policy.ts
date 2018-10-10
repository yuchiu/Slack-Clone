import { Response, NextFunction } from "express";

import models from "../models";

export default async (req: any, res: Response, next: NextFunction) => {
  const { teamId } = req.body;
  const currentUserId = req.user.id;
  const member = await models.TeamMember.findOne({
    where: { team_id: teamId, user_id: currentUserId },
    raw: true
  });
  // user have to be admin to create public or private channel
  if (!member.admin) {
    return res.status(401).send({
      meta: {
        type: "error",
        code: 401,
        message: "You have to be admin to be authorized"
      }
    });
  }
  next();
};
