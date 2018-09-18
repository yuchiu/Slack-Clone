import models from "../models";

export default {
  createMessage: async data => {
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
