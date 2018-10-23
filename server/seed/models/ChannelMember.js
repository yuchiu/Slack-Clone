const getNewId = require("./getNewId");

const ChannelMemberModel = (sequelize, DataTypes) => {
  const PrivateChannelMember = sequelize.define("channel_member", {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    }
  });

  return PrivateChannelMember;
};

module.exports = ChannelMemberModel;
