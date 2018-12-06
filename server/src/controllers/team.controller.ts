import * as _ from "lodash";
import { Request, Response } from "express";

import { redisCache, queries } from "./common";
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
      const teamList = await models.sequelize.query(queries.getTeamList, {
        replacements: [currentUserId],
        model: models.Team,
        raw: true
      });

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

      /* join all public channels */
      const publicChannelList = await models.sequelize.query(
        queries.getPublicChannelList,
        {
          replacements: [teamId],
          model: models.Channel,
          raw: true
        }
      );
      const publicChannelListMember = publicChannelList.map(channel => ({
        user_id: userToAdd.id,
        channel_id: channel.id
      }));

      /* create new member  */
      await models.sequelize.transaction(async transaction => {
        await models.TeamMember.create(
          { user_id: userToAdd.id, team_id: teamId },
          { transaction }
        );

        /* create channel member relation for all public channels */
        await models.ChannelMember.bulkCreate(publicChannelListMember, {
          transaction
        });
        // remove stale data from cache
        redisCache.delete(`teamMemberList:${teamId}`);
        publicChannelList.forEach(element => {
          redisCache.delete(`channelMemberList:${element.id}`);
        });
      });

      /*  get team and channel member list */
      const teamMemberList = await models.sequelize.query(
        queries.getTeamMemberList,
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );
      const channelMemberList = await models.sequelize.query(
        queries.getChannelMemberList,
        {
          replacements: [publicChannelList[0].id],
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
      const teamMemberList = await models.sequelize.query(
        queries.getTeamMemberList,
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );

      const channelList = await models.sequelize.query(queries.getChannelList, {
        replacements: { teamId, userId: currentUserId },
        model: models.Channel,
        raw: true
      });

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
