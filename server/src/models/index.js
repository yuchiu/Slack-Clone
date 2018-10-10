import Sequelize from "sequelize";
import { PSQL_NAME, PSQL_USER, PSQL_PASS } from "../utils/secrets";

const sequelize = new Sequelize(PSQL_NAME, PSQL_USER, PSQL_PASS, {
  dialect: "postgres",
  operatorsAliases: Sequelize.Op,
  logging: false,
  host: process.env.PSQL_HOST || "localhost",
  define: {
    underscored: true
  }
});

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
