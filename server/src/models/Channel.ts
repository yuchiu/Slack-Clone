import * as Sequelize from "sequelize";

import { getNewId } from "./common";

export const ChannelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ChannelInstance, ChannelAttributes> => {
  const attributes: SequelizeAttributes<ChannelAttributes> = {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    },
    name: DataTypes.STRING,
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    message_group: {
      type: DataTypes.BOOLEAN,
      field: "message_group",
      defaultValue: false
    },
    brief_description: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 127],
          msg: "The length cannot be longer than 128 characters"
        }
      }
    },
    detail_description: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 255],
          msg: "The length cannot be longer than 256 characters"
        }
      }
    }
  };
  const Channel = sequelize.define<ChannelInstance, ChannelAttributes>(
    "channel",
    attributes
  );

  Channel.associate = models => {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: "team_id",
        field: "team_id"
      }
    });

    // N:M
    Channel.belongsToMany(models.User, {
      through: models.ChannelMember,
      foreignKey: {
        name: "channel_id",
        field: "channel_id"
      }
    });
  };
  return Channel;
};
