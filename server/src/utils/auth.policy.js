import Joi from "joi";

import models from "../models";

export default {
  authentication: (req, res, next) => {
    if (!req.user) {
      res.status(403).send({
        meta: {
          type: "error",
          code: 403,
          message: "session authentication failed"
        }
      });
    } else {
      next();
    }
  },

  // disable authorization so it is easier to test out functionality in demo
  authorization: async (req, res, next) => {
    const { teamId } = req.body;
    const { currentUserId } = req.user.id;
    const member = await models.TeamMember.findOne(
      { where: { teamId, userId: currentUserId } },
      { raw: true }
    );
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
  },

  registerRule: (req, res, next) => {
    const schema = {
      username: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$")),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$"))
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(403).send({
            error: "email address is not valid"
          });
          break;
        case "username":
          res.status(403).send({
            error: `username is not valid
                    <br/>
                    1. It must be at least 4 characters and not greater than 32 characters.`
          });
          break;
        case "password":
          res.status(403).send({
            error: `the password provided failed to match the following rules:
                    <br/>
                    1. It must contain ONLY the following characters: lower case, upper case, numerics
                    <br/>
                    2. It must be at least 4 characters and not greater than 32 characters.
                    `
          });
          break;
        default:
          res.status(403).send({
            error: "invalid registration infomation"
          });
      }
    } else {
      next(); // call next if no errors in validation
    }
  }
};
