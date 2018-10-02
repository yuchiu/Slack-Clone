import _ from "lodash";

import { redisClient } from "../utils";
import models from "../models";

export default {
  create: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const teamName = req.body.name;
      const teamAbout = req.body.about;
      const response = await models.sequelize.transaction(async transaction => {
        const teamData = await models.Team.create(
          {
            name: teamName,
            brief_description: teamAbout
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
            brief_description:
              "Company-wide announcements and work-based matters",
            detail_description:
              "This channel is for workspace-wide communication and announcements. All members are in this channel.",
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

      // remove stale data from cache
      redisClient.del(`teamList:${currentUserId}`, (err, result) => {
        if (result === 1) {
          console.log(`Deleted teamList:${currentUserId}`);
        } else {
          console.log("Cannot delete");
        }
      });

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        team: response,
        teamList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
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

      // remove stale data from cache
      redisClient.del(`teamMemberList:${teamId}`, (err, result) => {
        if (result === 1) {
          console.log(`Deleted teamMemberList:${teamId}`);
        } else {
          console.log("Cannot delete");
        }
      });
      redisClient.del(
        `channelMemberList:${initialChannelId}`,
        (err, result) => {
          if (result === 1) {
            console.log(`Deleted channelMemberList:${initialChannelId}`);
          } else {
            console.log("Cannot delete");
          }
        }
      );

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        teamMemberList,
        channelMemberList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  getTeamAssociatedList: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const { teamId } = req.params;

      // check if redis has the data
      const channelListCache = await redisClient.getAsync(
        `channelList:${currentUserId}`
      );
      const teamMemberListCache = await redisClient.getAsync(
        `teamMemberList:${teamId}`
      );
      if (channelListCache && teamMemberListCache) {
        const channelListCacheArr = _.toArray(JSON.parse(channelListCache));
        const teamMemberListCacheArr = _.toArray(
          JSON.parse(teamMemberListCache)
        );

        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          channelList: channelListCacheArr,
          teamMemberList: teamMemberListCacheArr
        });
      }
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

      // Save the responses in Redis store
      await redisClient.setex(
        `channelList:${currentUserId}`,
        86400, // 60 * 60 * 24 seconds
        JSON.stringify({ ...channelList })
      );
      await redisClient.setex(
        `teamMemberList:${teamId}`,
        86400, // 60 * 60 * 24 seconds
        JSON.stringify({ ...teamMemberList })
      );

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        channelList,
        teamMemberList
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  }
};
