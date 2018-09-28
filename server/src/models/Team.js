export default (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
    }
  });

  Team.associate = models => {
    Team.belongsToMany(models.User, {
      through: models.TeamMember,
      foreignKey: {
        name: "teamId",
        field: "team_id"
      }
    });
  };

  return Team;
};
