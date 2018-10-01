import Sequelize from "sequelize";

export default {
  PORT: process.env.PORT || 3030,
  SERVER_URL: process.env.SERVER_URL || "http://localhost",
  SESSION_SECRET:
    process.env.SESSION_SECRET ||
    "dsadsadsadsadsasdadsadsasda323114334rfscadsasac",
  JWT_SECRET:
    process.env.JWT_SECRET || "ckmksadii8jrei8riwe3897547fjujrf928r32",
  REDIS: {
    PORT: process.env.REDIS_PORT || 6379
  },
  DB: {
    DB_NAME: process.env.DB_NAME || "slack",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASS: process.env.DB_PASS || "postgres",
    OPTIONS: process.env.OPTIONS || {
      dialect: "postgres",
      operatorsAliases: Sequelize.Op,
      logging: false,
      host: process.env.DB_HOST || "localhost",
      define: {
        underscored: true
      }
    }
  }
};
