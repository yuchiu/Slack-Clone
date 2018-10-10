import * as Sequelize from "sequelize";
import { DbInterface } from "./types";

import { PSQL_NAME, PSQL_USER, PSQL_PASS } from "../utils/secrets";
import { ChannelFactory } from "./Channel";
import { UserFactory } from "./User";
import { TeamFactory } from "./Team";
import { ChannelMemberFactory } from "./ChannelMember";
import { MessageFactory } from "./Message";
import { TeamMemberFactory } from "./TeamMember";

const createModels = (): DbInterface => {
  const sequelize = new Sequelize(PSQL_NAME, PSQL_USER, PSQL_PASS, {
    dialect: "postgres",
    logging: false,
    host: "localhost",
    define: {
      underscored: true
    }
  });

  const models: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Team: TeamFactory(sequelize, Sequelize),
    Channel: ChannelFactory(sequelize, Sequelize),
    Message: MessageFactory(sequelize, Sequelize),
    TeamMember: TeamMemberFactory(sequelize, Sequelize),
    ChannelMember: ChannelMemberFactory(sequelize, Sequelize)
  };

  Object.keys(models).forEach(modelName => {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
};

export default createModels();
