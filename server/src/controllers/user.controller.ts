import * as fse from "fs-extra";
import * as Identicon from "identicon.js";
import * as randomstring from "randomstring";
import * as randomHex from "randomhex";
import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import * as axios from "axios";
import { Request, Response } from "express";

import { redisCache, queries } from "./common";
import models from "../models";
import {
  SERVER_URL,
  SERVER_PORT,
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET
} from "../utils/secrets";

const userSummary = user => {
  const summary = {
    id: user.id,
    username: user.username,
    email: user.email,
    brief_description: user.brief_description,
    avatarurl: user.avatarurl,
    provider: user.provider,
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

  let avatarurl = `${SERVER_URL}:${SERVER_PORT}/assets/${avatarName}`;

  //assume port would be 80 for production build
  if (NODE_ENV === "production") {
    avatarurl = `${SERVER_URL}/assets/${avatarName}`;
  }
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

const generateInitialDemoTeam = async () => {
  await models.Team.create({
    name: "Demo Team",
    brief_description: "New users join this team for demo purposes"
  });
  const initialTeamData = await models.Team.findAll({ raw: true });
  const newChannel: any = {
    name: "general",
    brief_description: "Company-wide announcements and work-based matters",
    detail_description:
      "This channel is for workspace-wide communication and announcements. All members are in this channel.",
    public: true
  };
  newChannel.team_id = initialTeamData[0].id;
  await models.Channel.create(newChannel);
  return initialTeamData;
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
  getAllUsers: async (req: Request, res: Response) => {
    try {
      let userList: any = await models.User.findAll({ raw: true });
      userList = userList.map(user => userSummary(user));
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

  signInOauth: async (req: Request, res: Response) => {
    try {
      const credentials = req.body;
      if (!credentials.username || !credentials.email) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: "username and email are required"
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
        if (!isEmailRegistered.provider) {
          return res.status(403).send({
            meta: {
              type: "error",
              status: 403,
              message: `email: ${credentials.email} is already registered`
            }
          });
        }
        if (isEmailRegistered.provider !== credentials.provider) {
          /* conditions are validated, update the user */
          // remove empty field
          const updatedUserData: any = {
            username: isEmailRegistered.username,
            avatarurl: isEmailRegistered.avatarurl,
            email: isEmailRegistered.email,
            access_token: credentials.access_token,
            provider: credentials.provider
          };
          await models.User.update(
            {
              ...updatedUserData
            },
            {
              where: {
                email: isEmailRegistered.email
              },
              individualHooks: true
            }
          );
        }
      }

      /* oauth user exist, sign in user */
      if (isEmailRegistered && isEmailRegistered.provider) {
        let isOAuthVerified = false;
        /* validate facebook access token*/
        if (credentials.provider === "facebook") {
          const facebookAcessTokenVerifyUrl = `https://graph.facebook.com/debug_token?%20input_token=${
            credentials.access_token
          }&access_token=${FACEBOOK_CLIENT_ID}|${FACEBOOK_CLIENT_SECRET}`;

          const response = await axios.get(facebookAcessTokenVerifyUrl);
          if (response.data.data.is_valid) {
            isOAuthVerified = true;
          }
        }

        /* validate google access token*/
        if (credentials.provider === "google") {
          const googleAcessTokenVerifyUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${
            credentials.access_token
          }`;
          const response = await axios.get(googleAcessTokenVerifyUrl);
          if (response.issued_to === GOOGLE_CLIENT_ID) {
            isOAuthVerified = true;
          }
        }

        /* access token verified*/
        if (isOAuthVerified) {
          const signInUser = await models.User.findOne({
            where: {
              email: credentials.email
            },
            raw: true
          });
          const teamList = await models.sequelize.query(queries.getTeamList, {
            replacements: [signInUser.id],
            model: models.Team,
            raw: true
          });
          /* save session */
          req.session.user = signInUser;
          req.session.save(() => {});

          res.status(200).send({
            meta: {
              type: "success",
              status: 200,
              message: ""
            },
            user: userSummary(signInUser),
            teamList
          });
        }

        /* access token is notverified*/
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `authorization with ${credentials.provider} failed.`
          }
        });
      }

      /* new oauth user, register user*/

      /* create new member & auto join default team and channel */
      const createUserResponse = await models.sequelize.transaction(
        async transaction => {
          const newCredentials = { ...credentials };
          const hasInitialTeamCreated = await models.Team.count();
          let initialTeamIdData;
          if (!hasInitialTeamCreated) {
            initialTeamIdData = await generateInitialDemoTeam();
          }
          initialTeamIdData = await models.sequelize.query(
            queries.getInitialTeamId,
            {
              transaction,
              model: models.Channel,
              raw: true
            }
          );
          const initialTeamId = initialTeamIdData[0].id;
          const userData = await models.User.create(newCredentials, {
            transaction
          });
          const createdUser = userData.get({ plain: true });
          await models.TeamMember.create(
            {
              user_id: createdUser.id,
              team_id: initialTeamId
            },
            { transaction }
          );
          /* find the channel general from initial team and add new user to the general channel */
          const initialChannelData = await models.sequelize.query(
            queries.getInitialChannelId,
            {
              transaction,
              replacements: [initialTeamId],
              model: models.Channel,
              raw: true
            }
          );
          const initialChannelId = initialChannelData[0].id;

          await models.ChannelMember.create(
            {
              user_id: createdUser.id,
              channel_id: initialChannelId
            },
            { transaction }
          );
          return { createdUser, initialChannelId, initialTeamId };
        }
      );
      const {
        initialChannelId,
        initialTeamId,
        createdUser
      } = createUserResponse;

      /* get user's teams */
      const teamList = await models.sequelize.query(queries.getTeamList, {
        replacements: [createdUser.id],
        model: models.Team,
        raw: true
      });

      // remove stale data from cache
      redisCache.delete(`teamMemberList:${initialTeamId}`);
      redisCache.delete(`channelMemberList:${initialChannelId}`);

      /* save session */
      req.session.user = createdUser;
      req.session.save(() => {});

      /* response */
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        user: userSummary(createdUser),
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
          const hasInitialTeamCreated = await models.Team.count();
          let initialTeamIdData;
          if (!hasInitialTeamCreated) {
            initialTeamIdData = await generateInitialDemoTeam();
          }
          initialTeamIdData = await models.sequelize.query(
            queries.getInitialTeamId,
            {
              transaction,
              model: models.Channel,
              raw: true
            }
          );
          const initialTeamId = initialTeamIdData[0].id;
          const userData = await models.User.create(newCredentials, {
            transaction
          });
          const user = userData.get({ plain: true });
          await models.TeamMember.create(
            {
              user_id: user.id,
              team_id: initialTeamId
            },
            { transaction }
          );
          /* find the channel general from initial team and add new user to the general channel */
          const initialChannelData = await models.sequelize.query(
            queries.getInitialChannelId,
            {
              transaction,
              replacements: [initialTeamId],
              model: models.Channel,
              raw: true
            }
          );
          const initialChannelId = initialChannelData[0].id;

          await models.ChannelMember.create(
            {
              user_id: user.id,
              channel_id: initialChannelId
            },
            { transaction }
          );
          return { user, initialChannelId, initialTeamId };
        }
      );
      const { initialChannelId, initialTeamId, user } = createUserResponse;

      /* get user's teams */
      const teamList = await models.sequelize.query(queries.getTeamList, {
        replacements: [user.id],
        model: models.Team,
        raw: true
      });

      // remove stale data from cache
      redisCache.delete(`teamMemberList:${initialTeamId}`);
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
        where: { email: credentials.email },
        raw: true
      });

      /* user not registered */
      if (!user) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: `this account ${credentials.email} is not yet registered`
          }
        });
      }

      /* validate password */
      const isPasswordValid = await comparePassword(
        credentials.password,
        user.password
      );

      /* invalid password */
      if (!isPasswordValid) {
        return res.status(403).send({
          meta: {
            type: "error",
            status: 403,
            message: "invalid password"
          }
        });
      }
      /* get user's teams */
      const teamList = await models.sequelize.query(queries.getTeamList, {
        replacements: [user.id],
        model: models.Team,
        raw: true
      });
      /* save session */
      req.session.user = user;
      req.session.save(() => {});

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

      const user = await models.User.findOne({
        where: { id: currentUserId },
        raw: true
      });
      /* get user's teams */
      const teamList = await models.sequelize.query(queries.getTeamList, {
        replacements: [user.id],
        model: models.Team,
        raw: true
      });

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

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          return res.status(403).send({
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
        await models.sequelize.query(queries.updateMessageUseravatar, {
          replacements: { userId: currentUserId, newurl: avatarurl },
          model: models.Channel,
          raw: true
        });
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
          },
          individualHooks: true
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
        user: userSummary(updatedUser)
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
