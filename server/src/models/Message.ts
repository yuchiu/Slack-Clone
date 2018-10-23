import * as Sequelize from "sequelize";

import { getNewId } from "./common";

export const MessageFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<MessageInstance, MessageAttributes> => {
  const attributes: SequelizeAttributes<MessageAttributes> = {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    },
    username: DataTypes.STRING,
    avatarurl: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 1023],
          msg: "The length cannot be longer than 1024 characters"
        }
      }
    },
    text: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 9999],
          msg: "The length cannot be longer than 10000 characters"
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    filetype: {
      type: DataTypes.STRING,
      defaultValue: ""
    }
  };
  const Message = sequelize.define<MessageInstance, MessageAttributes>(
    "message",
    attributes
  );

  Message.associate = models => {
    // 1:M
    Message.belongsTo(models.Channel, {
      foreignKey: { name: "channel_id", field: "channel_id" }
    });
    Message.belongsTo(models.User, {
      foreignKey: { name: "user_id", field: "user_id" }
    });
  };

  return Message;
};
