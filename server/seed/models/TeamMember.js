const uuid = require("uuid/v4");

const getNewId = () => {
  const id = uuid();
  const removedHyphenId = id.replace(/-/g, "");
  return removedHyphenId;
};

const TeamMemberModel = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define("team_member", {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return TeamMember;
};

module.exports = TeamMemberModel;
