import models from "../models";

export default {
  create: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const { teamId, channelName } = req.body;
      const member = await models.Member.findOne(
        { where: { teamId, userId: currentUserId } },
        { raw: true }
      );
      if (!member.admin) {
        return res.status(403).send({
          error: "You have to be admin of the team to create channels"
        });
      }

      const channel = await models.Channel.create({
        name: channelName,
        public: true,
        teamId
      });
      const channelList = await models.Channel.findAll({
        where: { teamId },
        raw: true
      });
      res.status(200).send({
        channel,
        channelList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  }
};
