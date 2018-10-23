const getNewId = require("./getNewId");

const TeamModel = (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    },
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
    }
  });

  Team.associate = models => {
    Team.belongsToMany(models.User, {
      through: models.TeamMember,
      foreignKey: {
        name: "team_id",
        field: "team_id"
      }
    });
  };

  return Team;
};

module.exports = TeamModel;
