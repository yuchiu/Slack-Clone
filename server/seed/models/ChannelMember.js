const ChannelMemberModel = sequelize => {
  const PrivateChannelMember = sequelize.define("channel_member", {});

  return PrivateChannelMember;
};

module.exports = ChannelMemberModel;
