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
        await models.Channel.create(
          {
            name: "general",
            public: true,
            teamId: team.id
          },
          { transaction }
        );
        await models.Member.create(
          {
            teamId: team.id,
            userId: currentUserId,
            admin: true
          },
          { transaction }
        );
        return team;
      });
      /* get user's teams */
      const teamList = await models.sequelize.query(
        "select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?",
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
      console.log(req.body);
      const memberPromise = models.Member.findOne(
        { where: { teamId, currentUserId } },
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
      await models.Member.create({ userId: userToAdd.id, teamId });
      const team = await models.Team.find({ where: { id: teamId } });
      res.status(200).send({
        team
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
        "select * from users as u join members as m on m.user_id = u.id where m.team_id = ?",
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );
      const channelList = await models.Channel.findAll({
        where: { teamId },
        raw: true
      });
      const directMessageMemberList = await models.sequelize.query(
        "select distinct on (u.id) u.id, u.username from users as u join direct_messages as dm on (u.id = dm.sender_id) or (u.id = dm.receiver_id) where (:currentUserId = dm.sender_id or :currentUserId = dm.receiver_id) and dm.team_id = :teamId",
        {
          replacements: { currentUserId, teamId },
          model: models.User,
          raw: true
        }
      );
      // console.log("teamMemberList");
      // console.log(teamMemberList);
      // console.log("channelList");
      // console.log(channelList);
      // console.log("directMessageMemberList");
      // console.log(directMessageMemberList);
      res.status(200).send({
        teamMemberList,
        channelList,
        directMessageMemberList
      });
    } catch (err) {
      console.log(err);
    }
  }
};
