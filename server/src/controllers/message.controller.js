import models from "../models";

export default {
  getChannelMessage: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const { channelId } = req.params;
      const channelMessageList = await models.ChannelMessage.findAll(
        { order: [["created_at", "ASC"]], where: { channelId } },
        { raw: true }
      );
      res.status(200).send({
        channelMessageList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
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
