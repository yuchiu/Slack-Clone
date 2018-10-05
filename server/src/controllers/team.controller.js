import _ from "lodash";

import { redisCache } from "./common";
import models from "../models";

export default {
  create: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const teamName = req.body.name;
      const teamAbout = req.body.about;

      // remove stale data from cache
      redisCache.delete(`teamList:${currentUserId}`);

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
  addTeamMember: async teamData => {
    try {
      const { targetUsername, teamId } = teamData;

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

      const userToAdd = await models.User.findOne(
        { where: { username: targetUsername } },
        { raw: true }
      );
      if (!userToAdd) {
        return {
          meta: {
            type: "error",
            status: 403,
            message: "user does not exist"
          }
        };
      }

      // remove stale data from cache

      redisCache.delete(`teamMemberList:${teamId}`);
      redisCache.delete(`channelMemberList:${initialChannelId}`);

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

      return {
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        teamMemberList,
        channelMemberList
      };
    } catch (err) {
      console.log(err);
      return {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      };
    }
  },
  fetchTeamAssociatedList: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const { teamId } = req.params;

      // check if redis has the data
      const channelListCache = await redisCache.get(`channelList:${teamId}`);
      const teamMemberListCache = await redisCache.get(
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
      redisCache.set(`channelList:${teamId}`, channelList);
      redisCache.set(`teamMemberList:${teamId}`, teamMemberList);

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
