export default (sequelize, DataTypes) => {
  const GroupMessage = sequelize.define("group_message", {
    text: DataTypes.STRING
  });

  GroupMessage.associate = models => {
    // 1:M
    GroupMessage.belongsTo(models.Team, {
      foreignKey: {
        name: "teamId",
        field: "team_id"
      }
    });
    GroupMessage.belongsTo(models.User, {
      foreignKey: {
        name: "receiverId",
        field: "receiver_id"
      }
    });
    GroupMessage.belongsTo(models.User, {
      foreignKey: {
        name: "senderId",
        field: "sender_id"
      }
    });
  };

  return GroupMessage;
};
