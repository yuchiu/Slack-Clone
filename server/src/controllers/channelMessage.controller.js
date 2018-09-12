import models from "../models";

export default {
  getChannelMessage: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const { channelId } = req.params;

      const channelMessageList = models.ChannelMessage.findAll(
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
  createMessage: async data =>
    `${data} received! return data back from controller`
};
