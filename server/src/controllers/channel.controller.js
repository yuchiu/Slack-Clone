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
      // user have to be admin to create channel
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
        /*  check if it's private channel */
        if (!isPublic) {
          /*  filter out private channel members */
          const members = membersList.filter(
            memberId => memberId !== currentUserId
          );
          members.push(currentUserId);
          const ChannelMembers = members.map(memberId => ({
            userId: memberId,
            channelId: channel.dataValues.id
          }));
          /* create channel member relation for private member */
          await models.ChannelMember.bulkCreate(ChannelMembers, {
            transaction
          });

          /*  return channel created and private channel members */
          return { channel, channelMemberList: ChannelMembers };
        }

        /* create channel member relation for public member */
        const teamMemberList = await models.sequelize.query(
          "select * from users as u join members as m on m.user_id = u.id where m.team_id = ?",
          {
            replacements: [teamId],
            model: models.User,
            raw: true
          }
        );
        const channelMemberIdList = teamMemberList.map(m => ({
          userId: m.id,
          channelId: channel.dataValues.id
        }));
        await models.ChannelMember.bulkCreate(channelMemberIdList, {
          transaction
        });

        /* return channel created and public channel members */
        return { channel, channelMemberList: teamMemberList };
      });

      const channelList = await models.Channel.findAll({
        where: { teamId },
        raw: true
      });
      res.status(200).send({
        channelList,
        channel: response.channel,
        channelMemberList: response.channelMemberList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  getChannelAssociatedList: async (req, res) => {
    try {
      /*  req.user is retreived from bearer token of auth.policy */
      const currentUserId = req.user.id;
      const { channelId } = req.params;

      /* find channel user request to get message */
      const channel = await models.Channel.findOne({
        raw: true,
        where: { id: channelId }
      });
      const channelMessageList = await models.ChannelMessage.findAll(
        { order: [["created_at", "ASC"]], where: { channelId } },
        { raw: true }
      );

      /* check if channel is private */
      if (!channel.public) {
        /* check if user is member of private channel */
        const member = await models.ChannelMember.findOne({
          raw: true,
          where: { channelId, userId: currentUserId }
        });
        /* return error if user is not member */
        if (!member) {
          res.status(403).send({
            error: "you are not member of the private channel"
          });
        }
        /*  get private channel member list */
        const ChannelMemberList = await models.sequelize.query(
          "select * from users as u join channel_members as pcm on pcm.user_id = u.id where pcm.channel_id = ?",
          {
            replacements: [channelId],
            model: models.User,
            raw: true
          }
        );

        /*  return channel's messages and channel private member list */
        return res.status(200).send({
          channelMessageList,
          channelMemberList: ChannelMemberList
        });
      }

      /*  return channel's messages and channel public member list */
      const channelMemberList = await models.sequelize.query(
        "select * from users as u join channel_members as cm on cm.user_id = u.id where cm.channel_id = ?",
        {
          replacements: [channelId],
          model: models.User,
          raw: true
        }
      );
      res.status(200).send({
        channelMessageList,
        channelMemberList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  }
};
