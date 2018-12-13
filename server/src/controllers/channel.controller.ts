import * as _ from "lodash";
import { Request, Response } from "express";

import { redisCache, queries } from "./common";
import models from "../models";

export default {
  getAllChannel: async (req: Request, res: Response) => {
    try {
      const allChannel = models.Channel.findAll({ raw: true });
      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        allChannel
      });
    } catch (err) {
      res.status(500).send({
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      });
    }
  },
  createChannel: async (req: any, res: Response) => {
    try {
      const currentUserId = req.user.id;
      const {
        teamId,
        channelName,
        isPublic,
        detail_description,
        membersList,
        messageGroup
      } = req.body;
      // remove stale data from cache
      redisCache.delete(`channelList:${teamId}`);

      const createChannelResponse: any = await models.sequelize.transaction(
        async transaction => {
          let channel;

          /*  check if it's message group */
          if (!messageGroup) {
            const channelData = await models.Channel.create(
              {
                name: channelName,
                detail_description,
                public: isPublic,
                team_id: teamId
              },
              { transaction }
            );
            channel = channelData.get({ plain: true });
          }
          if (messageGroup) {
            /* check if message group already created between requested members */
            const allMembers = [...membersList, currentUserId];
            const [data, result] = await models.sequelize.query(
              queries.getEstablishedMessageGroup,
              {
                replacements: {
                  teamId,
                  allMembers,
                  allMembersLength: allMembers.length
                },
                raw: true
              }
            );

            /* message group already exist, respond with error */
            if (data.length) {
              return res.status(403).send({
                meta: {
                  type: "error",
                  status: 403,
                  message:
                    "direct message between members has already been created"
                }
              });
            }

            /* conditions are validated, create the message group */
            const channelData = await models.Channel.create(
              {
                name: channelName,
                public: isPublic,
                detail_description,
                message_group: true,
                team_id: teamId
              },
              { transaction }
            );
            channel = channelData.get({ plain: true });
          }

          /*  check if it's private channel */
          if (!isPublic) {
            /*  filter out private channel members */
            const members = membersList.filter(
              memberId => memberId !== currentUserId
            );
            members.push(currentUserId);
            const ChannelMembers = members.map(memberId => ({
              user_id: memberId,
              channel_id: channel.id
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
            queries.getTeamMemberList,
            {
              replacements: [teamId],
              model: models.User,
              raw: true
            }
          );
          const channelMemberIdList = teamMemberList.map(m => ({
            user_id: m.id,
            channel_id: channel.id
          }));
          await models.ChannelMember.bulkCreate(channelMemberIdList, {
            transaction
          });

          /* return channel created and public channel members */
          return {
            channel: channel,
            channelMemberList: teamMemberList
          };
        }
      );
      const { channel, channelMemberList } = createChannelResponse;

      const channelList = await models.sequelize.query(queries.getChannelList, {
        replacements: { teamId, userId: currentUserId },
        model: models.Channel,
        raw: true
      });

      res.status(200).send({
        meta: {
          type: "sucesss",
          status: 200,
          message: ""
        },
        channel,
        channelMemberList,
        channelList
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

  getChannelData: async (req: any, res: Response) => {
    try {
      const currentUserId = req.user.id;
      const { channelId } = req.params;

      /* find channel user request to get message */
      const channel = await models.Channel.findOne({
        raw: true,
        where: { id: channelId }
      });
      const messageList = await models.Message.findAll({
        order: [["created_at", "DESC"]],
        where: { channel_id: channelId },
        limit: 30,
        offset: 0,
        raw: true
      });

      /* check if channel is private */
      if (!channel.public) {
        /* check if user is member of private channel */
        const member = await models.ChannelMember.findOne({
          raw: true,
          where: { channel_id: channelId, user_id: currentUserId }
        });
        /* return error if user is not member */
        if (!member) {
          return res.status(403).send({
            meta: {
              type: "error",
              status: 403,
              message: "you are not member of the private channel"
            }
          });
        }
        /*  get private channel member list */
        const channelMemberList = await models.sequelize.query(
          queries.getChannelMemberList,
          {
            replacements: [channelId],
            model: models.User,
            raw: true
          }
        );

        /*  return channel's messages and channel private member list */
        return res.status(200).send({
          meta: {
            type: "success",
            status: 200,
            message: ""
          },
          messageList: messageList.reverse(),
          channelMemberList
        });
      }

      /*  return channel's messages and channel public member list */
      const channelMemberList = await models.sequelize.query(
        queries.getChannelMemberList,
        {
          replacements: [channelId],
          model: models.User,
          raw: true
        }
      );

      res.status(200).send({
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        messageList: messageList.reverse(),
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

  updateChannel: async (req: any, res: Response) => {
    try {
      const currentUserId = req.user.id;
      const {
        teamId,
        channelId,
        brief_description,
        detail_description
      } = req.body;

      // remove empty field
      let updatedChannelData: any = { brief_description, detail_description };
      updatedChannelData = _.pickBy(updatedChannelData, _.identity);

      // remove stale data from cache
      redisCache.delete(`channelList:${teamId}`);

      /* update the channel */
      await models.Channel.update(
        {
          ...updatedChannelData
        },
        {
          where: {
            id: channelId
          }
        }
      );

      const updatedChannel = await models.Channel.findOne({
        where: {
          id: channelId
        },
        raw: true
      });

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
        channel: updatedChannel
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
