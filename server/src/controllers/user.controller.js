import jwt from "jsonwebtoken";
import fse from "fs-extra";
import Identicon from "identicon.js";
import randomstring from "randomstring";
import randomHex from "randomhex";
import _ from "lodash";

import { redisClient } from "../utils";
import models from "../models";
import config from "../config";

const userSummary = user => {
  const summary = {
    id: user.id,
    username: user.username,
    email: user.email,
    brief_description: user.brief_description,
    avatarurl: user.avatarurl,
    detail_description: user.detail_description
  };
  return summary;
};

export default {
  register: async (req, res) => {
    try {
      const credentials = req.body;

      /* username or email is missing */
      if (!credentials.username || !credentials.email) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: "username and email are required"
          }
        });
      }

      const isUsernameRegistered = await models.User.findOne({
        where: { username: credentials.username },
        raw: true
      });

      /* username already registered */
      if (isUsernameRegistered) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `username: ${credentials.username} is already registered`
          }
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
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `email: ${credentials.email} is already registered`
          }
        });
      }
      /* generate random icon for user */
      const avatarData = new Identicon(randomHex(16), 420).toString();
      const avatarString = `data:image/png;base64,${avatarData}`;
      const avatarImage = avatarString.split(";base64,").pop();

      const avatarName = randomstring.generate().concat(".png");
      const filePath = `./assets/${avatarName}`;

      await fse.outputFile(filePath, avatarImage, { encoding: "base64" });

      credentials.avatarurl = `${config.SERVER_URL}:${
        config.PORT
      }/assets/${avatarName}`;

      /* credential is validated */
      const user = await models.User.create(credentials);

      /* auto join demo team */
      /* create new member  */
      await models.TeamMember.create({ userId: user.id, teamId: 1 });
      const teamMemberList = await models.sequelize.query(
        "select * from users as u join team_members as m on m.user_id = u.id where m.team_id = ?",
        {
          replacements: [1],
          model: models.User,
          raw: true
        }
      );

      /* find the initial channel general and add new user to the general channel */
      const initialChannel = await models.sequelize.query(
        "SELECT * FROM channels WHERE team_id = ? ORDER BY created_at LIMIT 1",
        {
          replacements: [1],
          model: models.Channel,
          raw: true
        }
      );
      const initialChannelId = initialChannel[0].id;

      await models.ChannelMember.create({
        userId: user.id,
        channelId: initialChannelId
      });

      /* save session */
      req.session.user = user.dataValues;
      req.session.save();

      /* response */
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
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
          meta: {
            type: "error",
            status: 403,
            message: `this account ${
              credentials.username
            } is not yet registered`
          }
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

      /* save session */
      req.session.user = user.dataValues;
      req.session.save();

      if (isPasswordValid) {
        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          user: userSummary(user.dataValues),
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
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },

  tryAutoLogin: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const userId = req.user.id;

      // check if redis has the data
      const userCache = await redisClient.getAsync(`userId:${userId}`);
      const teamListCache = await redisClient.getAsync(`teamList:${userId}`);

      if (userCache && teamListCache) {
        const userCacheJSON = JSON.parse(userCache);
        const teamListCacheArr = _.toArray(JSON.parse(teamListCache));
        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: "calling inside cache"
          },
          user: userSummary(userCacheJSON),
          teamList: teamListCacheArr
        });
      }

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

      // Save the responses in Redis store
      await redisClient.setex(
        `userId:${userId}`,
        86400, // 60 * 60 * 24 seconds
        JSON.stringify({ ...user })
      );
      await redisClient.setex(
        `teamList:${userId}`,
        86400, // 60 * 60 * 24 seconds
        JSON.stringify({ ...teamList })
      );

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: "outside cache"
        },
        user: userSummary(user),
        teamList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  }
};
