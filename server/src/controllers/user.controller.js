import fse from "fs-extra";
import Identicon from "identicon.js";
import randomstring from "randomstring";
import randomHex from "randomhex";
import _ from "lodash";

import { redisCache } from "./common";
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

const generateAvatar = async data => {
  /* generate random icon for user */
  const avatarData = new Identicon(randomHex(16), 420).toString();
  const avatarString = `data:image/png;base64,${avatarData}`;
  const avatarImage = avatarString.split(";base64,").pop();

  const avatarName = randomstring.generate().concat(".png");
  const filePath = `./assets/${avatarName}`;

  await fse.outputFile(filePath, avatarImage, { encoding: "base64" });

  const newData = { ...data };
  newData.avatarurl = `${config.SERVER_URL}:${
    config.SERVER_PORT
  }/assets/${avatarName}`;

  return newData;
};

export default {
  getUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await models.user.findOne(
        {
          where: {
            id: userId
          }
        },
        { raw: true }
      );
      res.status(200).send({
        meta: {
          type: "sucesss",
          status: 200,
          message: ""
        },
        user
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
  getAllUsers: async (req, res) => {
    try {
      const userList = await models.User.findAll({ raw: true });
      res.status(200).send({
        meta: {
          type: "sucess",
          status: 200,
          message: ""
        },
        userList: userList.dataValues
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

  createUser: async (req, res) => {
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

      /* create new member & auto join default team and channel */
      const createUserResponse = await models.sequelize.transaction(
        async transaction => {
          const newCredentials = await generateAvatar(credentials);

          console.log(newCredentials);
          const user = await models.User.create(newCredentials, {
            transaction
          });

          const initialDemoTeamId = 1;
          await models.TeamMember.create(
            {
              userId: user.id,
              teamId: initialDemoTeamId
            },
            { transaction }
          );

          /* find the initial channel general and add new user to the general channel */
          const initialChannel = await models.sequelize.query(
            "SELECT * FROM channels WHERE team_id = ? ORDER BY created_at LIMIT 1",
            {
              transaction,
              replacements: [1],
              model: models.Channel,
              raw: true
            }
          );
          const initialChannelId = initialChannel[0].id;

          await models.ChannelMember.create(
            {
              userId: user.id,
              channelId: initialChannelId
            },
            { transaction }
          );
          return { user, initialChannelId, initialDemoTeamId };
        }
      );
      const { initialChannelId, initialDemoTeamId, user } = createUserResponse;

      /* get user's teams */
      const teamList = await models.sequelize.query(
        "select * from teams as team join team_members as member on team.id = member.team_id where member.user_id = ?",
        {
          replacements: [user.id],
          model: models.Team,
          raw: true
        }
      );

      // remove stale data from cache
      redisCache.delete(`teamMemberList:${initialDemoTeamId}`);
      redisCache.delete(`channelMemberList:${initialChannelId}`);

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
      const currentUserId = req.user.id;
      // check if redis has the data
      const userCache = await redisCache.get(`userId:${currentUserId}`);
      const teamListCache = await redisCache.get(`teamList:${currentUserId}`);

      if (userCache && teamListCache) {
        const userCacheJSON = JSON.parse(userCache);
        const teamListCacheArr = _.toArray(JSON.parse(teamListCache));
        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          user: userSummary(userCacheJSON),
          teamList: teamListCacheArr
        });
      }

      const user = await models.User.findOne({
        where: { id: currentUserId },
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
      redisCache.set(`userId:${currentUserId}`, user);
      redisCache.set(`teamList:${currentUserId}`, teamList);

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
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
  },
  updateUser: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const {
        brief_description,
        detail_description,
        password,
        imgFile,
        newPassword
      } = req.body;

      if (newPassword) {
        const user = await models.User.findOne({
          where: { id: currentUserId }
        });

        /* validate password */
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          res.status(500).send({
            meta: {
              type: "error",
              status: 403,
              message: "invalid password"
            }
          });
        }
      }

      if (imgFile) {
        const updatedImgFile = imgFile.split(";base64,").pop();

        const avatarName = randomstring.generate().concat(".png");
        const filePath = `./assets/${avatarName}`;

        await fse.outputFile(filePath, updatedImgFile, { encoding: "base64" });
      }
      // remove stale data from cache
      redisCache.delete(`userId:${currentUserId}`);

      // remove empty field
      let updatedUserData = {
        brief_description,
        detail_description,
        password: newPassword
      };
      updatedUserData = _.pickBy(updatedUserData, _.identity);

      /* conditions are validated, update the user */
      await models.User.update(
        {
          ...updatedUserData
        },
        {
          where: {
            id: currentUserId
          }
        }
      );
      const updatedUser = await models.User.findOne({
        where: {
          id: currentUserId
        }
      });

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: updatedUser
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
