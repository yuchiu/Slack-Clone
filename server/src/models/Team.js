export default (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    name: {
      type: DataTypes.STRING
    },
    icon_url: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 1023],
          msg: "The length cannot be longer than 1024 characters"
        }
      }
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
