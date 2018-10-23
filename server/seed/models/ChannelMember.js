const uuid = require("uuid/v4");

const getNewId = () => {
  const id = uuid();
  const removedHyphenId = id.replace(/-/g, "");
  return removedHyphenId;
};

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
