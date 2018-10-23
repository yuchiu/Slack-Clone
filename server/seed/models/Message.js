const getNewId = require("./getNewId");

const MessageModel = (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
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
  });
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

module.exports = MessageModel;
