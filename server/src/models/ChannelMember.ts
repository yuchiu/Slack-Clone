import * as Sequelize from "sequelize";
import { ChannelMemberAttributes, ChannelMemberInstance } from "./types";

export const ChannelMemberFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ChannelMemberInstance, ChannelMemberAttributes> => {
  const attributes: SequelizeAttributes<ChannelMemberAttributes> = {};
  const ChannelMember = sequelize.define<
    ChannelMemberInstance,
    ChannelMemberAttributes
  >("channel_member", attributes);

  return ChannelMember;
};
