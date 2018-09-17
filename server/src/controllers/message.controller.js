import models from "../models";

export default {
  createMessage: async data => {
    const { channelId, userId, text, username } = data;
    const messageResponse = await models.Message.create({
      channelId,
      userId,
      username,
      text
    });

    const message = messageResponse.dataValues;

    const messageList = await models.Message.findAll(
      { order: [["created_at", "ASC"]], where: { channelId } },
      { raw: true }
    );

    return { messageList, message };
  }
};
