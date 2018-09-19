import fse from "fs-extra";
import path from "path";
import util from "util";

import models from "../models";

export default {
  createMessage: async data => {
    try {
      const { channelId, userId, text, username, file } = data;
      if (!file) {
        const messageResponse = await models.Message.create({
          channelId,
          userId,
          username,
          text
        });

        const message = messageResponse.dataValues;

        return { message };
      }

      if (file.size > 1024 * 1024 * 5) {
        return { error: "file size exceed 5 mbs" };
      }

      /* generate random name */
      const fileExtension = file.name.replace(/^.*\./, "");
      const randomFileName = Math.random()
        .toString(36)
        .substring(2, 15)
        .concat(Date.now().toString(36))
        .replace(/[^0-9a-z]/gi, "")
        .concat(`.${fileExtension}`);
      const filePath = path.join(
        __dirname,
        "../",
        "../",
        "assets",
        "files",
        randomFileName
      );

      /* write file and create message */
      await fse.outputFile(filePath, file.data);
      const messageResponse = await models.Message.create({
        channelId,
        userId,
        username,
        filetype: file.type,
        url: `http://localhost:3030/files/${randomFileName}`
      });

      const message = messageResponse.dataValues;
      return { message };
    } catch (err) {
      return { error: "an error occured while creating message" };
    }
  },
  getMoreMessage: async (req, res) => {
    try {
      /*  req.user is retreived from bearer token of auth.policy */
      const currentUserId = req.user.id;
      const { offset, channelId } = req.body;

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
      return res.status(200).send({
        messageList: messageList.reverse()
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  }
};
