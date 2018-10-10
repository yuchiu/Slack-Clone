import * as fse from "fs-extra";
import * as Identicon from "identicon.js";
import * as randomstring from "randomstring";
import * as randomHex from "randomhex";
import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { redisCache } from "./common";
import models from "../models";
import { SERVER_URL, SERVER_PORT } from "../utils/secrets";

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

const comparePassword = async function(credentialsPassword, userPassword) {
  const isPasswordMatch = await bcrypt.compare(
    credentialsPassword,
    userPassword
  );
  return isPasswordMatch;
};

const generateRandomImg = () => {
  /* generate random icon for user */
  const avatarData = new Identicon(randomHex(16), 420).toString();
  const avatarBase64Img = `data:image/png;base64,${avatarData}`;
  return avatarBase64Img;
};

const saveBase64Img = async avatarBase64Img => {
  /* generate random icon for user */
  const avatarImage = avatarBase64Img.split(";base64,").pop();

  const avatarName = randomstring.generate().concat(".png");
  const filePath = `./assets/${avatarName}`;

  await fse.outputFile(filePath, avatarImage, { encoding: "base64" });

  const avatarurl = `${SERVER_URL}:${SERVER_PORT}/assets/${avatarName}`;

  return avatarurl;
};

const removePreviousImg = avatarurl => {
  const urlBeginIndex = avatarurl.indexOf("/assets/");
  const localUrl = avatarurl.slice(urlBeginIndex);

  fse.remove(`.${localUrl}`, err => {
    if (err) throw err;
    console.log(`${localUrl} was deleted`);
  });
};

export default {
  getUser: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await models.User.findOne({
        where: {
          id: userId
        },
        raw: true
      });
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
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const userList = await models.User.findAll({ raw: true });
      res.status(200).send({
        meta: {
          type: "sucess",
          status: 200,
          message: "all"
        },
        userList: userList
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

  signUpUser: async (req: Request, res: Response) => {
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
          const avatarBase64Img = generateRandomImg();
          const avatarurl = await saveBase64Img(avatarBase64Img);
          const newCredentials = { ...credentials, avatarurl };
          const initialDemoTeamId = 1;

          const userData = await models.User.create(newCredentials, {
            transaction
          });
          const user = userData.get({ plain: true });
          await models.TeamMember.create(
            {
              user_id: user.id,
              team_id: initialDemoTeamId
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
              user_id: user.id,
              channel_id: initialChannelId
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
      req.session.user = user;
      req.session.save(() => {});

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
  singInUser: async (req: Request, res: Response) => {
    try {
      const credentials = req.body;
      const user = await models.User.findOne({
        where: { username: credentials.username },
        raw: true
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
      const isPasswordValid = await comparePassword(
        credentials.password,
        user.password
      );

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
      req.session.user = user;
      req.session.save(() => {});

      if (isPasswordValid) {
        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          user: userSummary(user),
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
  signOutUser: async (req: Request, res: Response) => {
    try {
      req.session.destroy(() => {});
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

  tryAutoSingInUser: async (req: any, res: Response) => {
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
  updateUser: async (req: any, res: Response) => {
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
        const isPasswordValid = await comparePassword(password, user.password);

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
      let avatarurl;

      // if user uploads avatar img, save it and remove previous avatar
      if (imgFile) {
        avatarurl = await saveBase64Img(imgFile);
        const user = await models.User.findOne({
          where: {
            id: currentUserId
          },
          raw: true
        });
        removePreviousImg(user.avatarurl);
        await models.sequelize.query(
          `UPDATE messages 
          SET avatarurl=:newurl 
          WHERE messages.user_id=:userId
          RETURNING *`,
          {
            replacements: { userId: currentUserId, newurl: avatarurl },
            model: models.Channel,
            raw: true
          }
        );
      }
      // remove stale data from cache
      redisCache.delete(`userId:${currentUserId}`);

      // remove empty field
      let updatedUserData: any = {
        avatarurl,
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
