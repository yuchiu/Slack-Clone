import models from "../models";

export default {
  create: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const teamName = req.body.name;
      const response = await models.sequelize.transaction(async transaction => {
        const teamData = await models.Team.create(
          {
            name: teamName
          },
          { transaction }
        );
        const team = teamData.dataValues;
        await models.TeamMember.create(
          {
            teamId: team.id,
            userId: currentUserId,
            admin: true
          },
          { transaction }
        );
        const channel = await models.Channel.create(
          {
            name: "general",
            public: true,
            description: "Company-wide announcements and work-based matters",
            teamId: team.id
          },
          { transaction }
        );
        await models.ChannelMember.create(
          {
            userId: currentUserId,
            channelId: channel.dataValues.id
          },
          { transaction }
        );
        return team;
      });
      /* get user's teams */
      const teamList = await models.sequelize.query(
        "select * from teams as team join team_members as member on team.id = member.team_id where member.user_id = ?",
        {
          replacements: [currentUserId],
          model: models.Team,
          raw: true
        }
      );
      res.status(200).send({
        team: response,
        teamList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  addTeamMember: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const { teamId } = req.body;
      const { targetUsername } = req.body;
      const memberPromise = models.TeamMember.findOne(
        { where: { teamId, userId: currentUserId } },
        { raw: true }
      );
      const userToAddPromise = models.User.findOne(
        { where: { username: targetUsername } },
        { raw: true }
      );
      const [member, userToAdd] = await Promise.all([
        memberPromise,
        userToAddPromise
      ]);
      if (!member.admin) {
        return res.status(403).send({
          error: "you are can not add members to the team"
        });
      }
      if (!userToAdd) {
        return res.status(403).send({
          error: "user does not exist"
        });
      }

      /* create new member  */
      await models.TeamMember.create({ userId: userToAdd.id, teamId });
      const teamMemberList = await models.sequelize.query(
        "select * from users as u join team_members as m on m.user_id = u.id where m.team_id = ?",
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );

      /* find the initial channel general and add new user to the general channel */
      const initialChannel = await models.sequelize.query(
        "SELECT * FROM channels WHERE team_id = ? ORDER BY created_at LIMIT 1",
        {
          replacements: [teamId],
          model: models.Channel,
          raw: true
        }
      );
      const initialChannelId = initialChannel[0].id;

      await models.ChannelMember.create({
        userId: userToAdd.id,
        channelId: initialChannelId
      });

      /*  return team and channel member list */
      const channelMemberList = await models.sequelize.query(
        "select * from users as u join channel_members as cm on cm.user_id = u.id where cm.channel_id = ?",
        {
          replacements: [initialChannelId],
          model: models.User,
          raw: true
        }
      );
      res.status(200).send({
        teamMemberList,
        channelMemberList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  getTeamAssociatedList: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const { teamId } = req.params;

      const teamMemberList = await models.sequelize.query(
        "select * from users as u join team_members as m on m.user_id = u.id where m.team_id = ?",
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );
      const channelList = await models.sequelize.query(
        `
          select distinct on (id) *
          from channels as c left outer join channel_members as pcm
          on c.id = pcm.channel_id
          where c.team_id = :teamId and (c.public = true or pcm.user_id = :userId);`,
        {
          replacements: { teamId, userId: currentUserId },
          model: models.Channel,
          raw: true
        }
      );

      res.status(200).send({
        teamMemberList,
        channelList
      });
    } catch (err) {
      console.log(err);
    }
  }
};
