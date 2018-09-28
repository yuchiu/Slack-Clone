export default (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    name: {
      type: DataTypes.STRING
    },
    brief_description: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 127],
          msg: "The length cannot be longer than 128 characters"
        }
      }
    },
    detail_description: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [0, 255],
          msg: "The length cannot be longer than 256 characters"
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
