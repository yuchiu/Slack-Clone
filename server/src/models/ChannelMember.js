export default sequelize => {
  const PrivateChannelMember = sequelize.define("channel_member", {});

  return PrivateChannelMember;
};
