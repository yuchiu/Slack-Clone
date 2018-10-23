import * as Sequelize from "sequelize";

import { getNewId } from "./common";

export const ChannelMemberFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ChannelMemberInstance, ChannelMemberAttributes> => {
  const attributes: SequelizeAttributes<ChannelMemberAttributes> = {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    }
  };
  const ChannelMember = sequelize.define<
    ChannelMemberInstance,
    ChannelMemberAttributes
  >("channel_member", attributes);

  return ChannelMember;
};
