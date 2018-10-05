import Sequelize from "sequelize";
import config from "../config";

const sequelize = new Sequelize(
  config.PSQL_NAME,
  config.PSQL_USER,
  config.PSQL_PASS,
  {
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
    logging: false,
    host: process.env.PSQL_HOST || "localhost",
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

export default models;
