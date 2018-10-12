import * as fse from "fs-extra";
import * as randomstring from "randomstring";
import { Request, Response } from "express";
import * as _ from "lodash";

import { SERVER_URL, SERVER_PORT } from "../utils/secrets";
import models from "../models";
import { redisCache } from "./common";

const validateUploadFiles = data => {
  if (data.size > 1024 * 1024 * 5) {
    return { size: false };
  }
  if (
    !data.type.startsWith("image/") &&
    !data.type.startsWith("text/plain") &&
    !data.type.startsWith("audio/")
  ) {
    return { type: false };
  }
  return { size: true, type: true };
};

const generateFileName = data => {
  const fileExtension = data.name.replace(/^.*\./, "");
  const randomFileName = randomstring.generate().concat(`.${fileExtension}`);
  return randomFileName;
};

export default {
  getAllMessage: async (req: Request, res: Response) => {
    try {
      const allMessage = models.Message.findAll({ raw: true });
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        allMessage
      });
    } catch (err) {
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  createMessage: async data => {
    try {
      const { channelId, userId, text, username, avatarurl, file } = data;

      // remove stale data from cache
      redisCache.delete(`messageList:${channelId}`);

      /* check if it is upload or message */
      if (!file) {
        const messageResponse = await models.Message.create({
          channel_id: channelId,
          user_id: userId,
          avatarurl,
          username,
          text
        });
        const message = messageResponse.get({ plain: true });
        return {
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          message
        };
      }
      const isFileValid = validateUploadFiles(file);
      if (!isFileValid.size) {
        return {
          meta: {
            type: "error",
            status: 403,
            message: "file exceed maximum size of 5 mbs"
          }
        };
      }
      if (!isFileValid.type) {
        return {
          meta: {
            type: "error",
            status: 403,
            message: "Files upload can only be in text, image, or audio type"
          }
        };
      }

      /* generate random name */
      const randomFileName = generateFileName(file);

      const filePath = `./assets/${randomFileName}`;

      /* write file and create message */
      await fse.outputFile(filePath, file.data);

      const messageResponse = await models.Message.create({
        channel_id: channelId,
        user_id: userId,
        avatarurl,
        username,
        filetype: file.type,
        url: `${SERVER_URL}:${SERVER_PORT}/assets/${randomFileName}`
      });

      const message = messageResponse.get({ plain: true });
      return {
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        message
      };
    } catch (err) {
      console.log(err);
      return {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      };
    }
  },
  getMessage: async (req: any, res: Response) => {
    try {
      const currentUserId = req.user.id;
      const { channelId } = req.params;
      const { offset } = req.query;

      const channel = await models.Channel.findOne({
        raw: true,
        where: { id: channelId }
      });

      if (!channel.public) {
        const member = await models.ChannelMember.findOne({
          raw: true,
          where: { channel_id: channelId, user_id: currentUserId }
        });
        if (!member) {
          res.status(403).send({
            meta: {
              type: "error",
              status: 403,
              message: "Not Authorized"
            }
          });
        }
      }

      const messageList = await models.Message.findAll({
        order: [["created_at", "DESC"]],
        where: { channel_id: channelId },
        limit: 30,
        offset,
        raw: true
      });

      return res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        messageList: messageList.reverse()
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
