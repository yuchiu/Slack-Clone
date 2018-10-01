import fse from "fs-extra";
import randomstring from "randomstring";
import _ from "lodash";

import { redisClient } from "../utils";
import config from "../config";
import models from "../models";

export default {
  createMessage: async data => {
    try {
      const { channelId, userId, text, username, avatarurl, file } = data;

      /* check if it is upload or message */
      if (!file) {
        const messageResponse = await models.Message.create({
          channelId,
          userId,
          avatarurl,
          username,
          text
        });

        const message = messageResponse.dataValues;

        return { message };
      }

      /* validate files */
      if (file.size > 1024 * 1024 * 5) {
        return { error: "file exceed maximum size of 5 mbs" };
      }
      if (
        !file.type.startsWith("image/") &&
        !file.type === "text/plain" &&
        !file.type.startsWith("audio/")
      ) {
        return {
          error: "Files upload can only be in text, image, or audio type"
        };
      }

      /* generate random name */
      const fileExtension = file.name.replace(/^.*\./, "");
      const randomFileName = randomstring
        .generate()
        .concat(`.${fileExtension}`);
      const filePath = `./assets/${randomFileName}`;

      /* write file and create message */

      await fse.outputFile(filePath, file.data);

      const messageResponse = await models.Message.create({
        channelId,
        userId,
        avatarurl,
        username,
        filetype: file.type,
        url: `${config.SERVER_URL}:${config.PORT}/assets/${randomFileName}`
      });

      const message = messageResponse.dataValues;
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
  getMoreMessage: async (req, res) => {
    try {
      /*  req.user is retreived from bearer token of auth.policy */
      const currentUserId = req.user.id;
      const { offset, channelId } = req.body;

      // check if redis has the data
      const messagelListCache = await redisClient.getAsync(
        `messageList:${channelId}offset:${offset}`
      );
      if (messagelListCache) {
        const messagelListCacheArr = _.toArray(JSON.parse(messagelListCache));

        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          messageList: messagelListCacheArr.reverse()
        });
      }

      const channel = await models.Channel.findOne({
        raw: true,
        where: { id: channelId }
      });

      if (!channel.public) {
        const member = await models.ChannelMember.findOne({
          raw: true,
          where: { channelId, userId: currentUserId }
        });
        if (!member) {
          throw new Error("Not Authorized");
        }
      }

      const messageList = await models.Message.findAll(
        {
          order: [["created_at", "DESC"]],
          where: { channelId },
          limit: 30,
          offset
        },
        { raw: true }
      );

      // Save the responses in Redis store
      await redisClient.setex(
        `messageList:${channelId}offset:${offset}`,
        86400, // 60 * 60 * 24 seconds
        JSON.stringify({ source: "Redis Cache", ...messageList })
      );

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
