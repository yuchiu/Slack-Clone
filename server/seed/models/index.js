const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.PSQL_NAME || "slack",
  process.env.PSQL_USER || "postgres",
  process.env.PSQL_PASS || "postgres",
  {
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
    logging: false,
    host: process.env.PSQL_HOST,
    define: {
      underscored: true
    }
  }
);

const models = {
  sequelize,
  Sequelize,
  User: sequelize.import("./User"),
  Channel: sequelize.import("./Channel"),
  Team: sequelize.import("./Team"),
  TeamMember: sequelize.import("./TeamMember"),
  ChannelMember: sequelize.import("./ChannelMember"),
  Message: sequelize.import("./Message")
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = models;
