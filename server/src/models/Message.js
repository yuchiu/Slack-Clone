export default (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    username: DataTypes.STRING,
    avatarurl: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    text: {
      type: DataTypes.STRING,
      defaultValue: ""
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
      foreignKey: { name: "channelId", field: "channel_id" }
    });
    Message.belongsTo(models.User, {
      foreignKey: { name: "userId", field: "user_id" }
    });
  };

  return Message;
};
