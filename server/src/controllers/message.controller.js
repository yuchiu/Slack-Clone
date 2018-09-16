import models from "../models";

export default {
  createMessage: async data => {
    const { channelId, userId, text, username } = data;
    const messageResponse = await models.ChannelMessage.create({
      channelId,
      userId,
      username,
      text
    });

    const message = messageResponse.dataValues;

    const channelMessageList = await models.ChannelMessage.findAll(
      { order: [["created_at", "ASC"]], where: { channelId } },
      { raw: true }
    );

    return { channelMessageList, message };
  }
};
