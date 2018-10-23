const getNewId = require("./getNewId");

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
