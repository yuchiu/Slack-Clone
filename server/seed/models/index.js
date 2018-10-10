const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.PSQL_NAME,
  process.env.PSQL_USER,
  process.env.PSQL_PASS,
  {
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
    logging: false,
    host: "localhost",
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
