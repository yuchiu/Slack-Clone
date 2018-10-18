import * as _ from "lodash";
import { Request, Response } from "express";

import { redisCache } from "./common";
import models from "../models";

export default {
  getAllTeam: async (req: Request, res: Response) => {
    try {
      const allTeam = models.Team.findAll({ raw: true });

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        allTeam
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
  createTeam: async (req: any, res: Response) => {
    try {
      const currentUserId = req.user.id;
      const teamName = req.body.name;
      const teamAbout = req.body.about;

      // remove stale data from cache
      redisCache.delete(`teamList:${currentUserId}`);

      const createTeamResponse = await models.sequelize.transaction(
        async transaction => {
          const teamData = await models.Team.create(
            {
              name: teamName,
              brief_description: teamAbout
            },
            { transaction, raw: true }
          );
          const team = teamData.get({ plain: true });

          await models.TeamMember.create(
            {
              team_id: team.id,
              user_id: currentUserId,
              admin: true
            },
            { transaction }
          );
          const channelData = await models.Channel.create(
            {
              name: "general",
              public: true,
              brief_description:
                "Company-wide announcements and work-based matters",
              detail_description:
                "This channel is for workspace-wide communication and announcements. All members are in this channel.",
              team_id: team.id
            },
            { transaction }
          );
          const channel = channelData.get({ plain: true });
          await models.ChannelMember.create(
            {
              user_id: currentUserId,
              channel_id: channel.id
            },
            { transaction }
          );
          return team;
        }
      );

      const team = createTeamResponse;
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
        team,
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

      const userToAdd = await models.User.findOne({
        where: { username: targetUsername },
        raw: true
      });
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
      await models.sequelize.transaction(async transaction => {
        await models.TeamMember.create(
          { user_id: userToAdd.id, team_id: teamId },
          { transaction }
        );

        await models.ChannelMember.create(
          {
            user_id: userToAdd.id,
            channel_id: initialChannelId
          },
          { transaction }
        );
      });

      /*  get team and channel member list */
      const teamMemberList = await models.sequelize.query(
        "select * from users as u join team_members as m on m.user_id = u.id where m.team_id = ?",
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );
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
  updateTeam: async (req: any, res: Response) => {
    try {
      const { teamId, brief_description } = req.body;

      /* update the channel */
      await models.Team.update(
        {
          brief_description
        },
        {
          where: {
            id: teamId
          }
        }
      );

      const updatedTeam = await models.Team.findOne({
        where: {
          id: teamId
        },
        raw: true
      });
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        team: updatedTeam
      });
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
  getTeamData: async (req: any, res: Response) => {
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
