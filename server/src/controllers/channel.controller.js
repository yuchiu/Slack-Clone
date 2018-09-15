import models from "../models";

export default {
  create: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const { teamId, channelName, isPublic, membersList } = req.body;
      const member = await models.Member.findOne(
        { where: { teamId, userId: currentUserId } },
        { raw: true }
      );
      if (!member.admin) {
        return res.status(403).send({
          error: "You have to be admin of the team to create channels"
        });
      }

      const response = await models.sequelize.transaction(async transaction => {
        const channel = await models.Channel.create(
          {
            name: channelName,
            public: isPublic,
            teamId
          },
          { transaction }
        );
        if (!isPublic) {
          const members = membersList.filter(
            memberId => memberId !== currentUserId
          );
          members.push(currentUserId);
          const privateChannelMembers = members.map(memberId => ({
            userId: memberId,
            channelId: channel.dataValues.id
          }));
          await models.PrivateChannelMember.bulkCreate(privateChannelMembers, {
            transaction
          });
        }
        return channel;
      });

      const channelList = await models.Channel.findAll({
        where: { teamId },
        raw: true
      });
      console.log(response, channelList);
      res.status(200).send({
        channel: response,
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
