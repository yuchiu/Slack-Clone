import jwt from "jsonwebtoken";

import models from "../models";
import config from "../../config";

const jwtSignUser = user => {
  try {
    const userJson = user.toJSON();
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(userJson, config.JWT_SECRET, {
      expiresIn: ONE_WEEK
    });
  } catch (err) {
    console.log(err);
  }
};

const userSummary = user => {
  const summary = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  return summary;
};

export default {
  create: async (req, res) => {
    try {
      const credentials = req.body;

      /* username or email is missing */
      if (!credentials.username || !credentials.email) {
        res.status(500).send({
          error: "username and email are required"
        });
      }

      const isUsernameRegistered = await models.User.findOne({
        where: { username: credentials.username },
        raw: true
      });

      /* username already registered */
      if (isUsernameRegistered) {
        res.status(403).send({
          error: `username: ${credentials.username} is already registered`
        });
      }

      const isEmailRegistered = await models.User.findOne({
        where: {
          email: credentials.email
        },
        raw: true
      });

      /* email already registered */
      if (isEmailRegistered) {
        res.status(403).send({
          error: `email: ${credentials.email} is already registered`
        });
      }

      /* credential is validated */
      const user = await models.User.create(credentials);
      res.status(200).send({
        user: userSummary(user),
        token: jwtSignUser(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  login: async (req, res) => {
    try {
      const credentials = req.body;
      const user = await models.User.findOne({
        where: { username: credentials.username }
      });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          error: `this account ${credentials.username} is not yet registered`
        });
      }

      /* validate password */
      const isPasswordValid = await user.comparePassword(credentials.password);

      /* get user's teams */
      const teamList = await models.sequelize.query(
        "select * from teams as team join team_members as member on team.id = member.team_id where member.user_id = ?",
        {
          replacements: [user.id],
          model: models.Team,
          raw: true
        }
      );
      if (isPasswordValid) {
        return res.status(200).send({
          user: userSummary(user.dataValues),
          token: jwtSignUser(user),
          teamList
        });
      }

      /* invalid password */
      res.status(403).send({
        error: "invalid password"
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  bearerTokenAuth: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const userId = req.user.id;
      const user = await models.User.findOne({
        where: { id: userId },
        raw: true
      });
      /* get user's teams */
      const teamList = await models.sequelize.query(
        "select * from teams as team join team_members as member on team.id = member.team_id where member.user_id = ?",
        {
          replacements: [user.id],
          model: models.Team,
          raw: true
        }
      );
      res.status(200).send({
        user: userSummary(user),
        teamList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  }
};
