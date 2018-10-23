import * as Sequelize from "sequelize";
import * as uuid from "uuid/v4";

const getNewId = () => {
  const id = uuid();
  const removedHyphenId = id.replace(/-/g, "");
  return removedHyphenId;
};

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
