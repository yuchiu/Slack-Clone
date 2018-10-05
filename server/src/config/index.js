export default {
  SERVER_PORT: process.env.SERVER_PORT || 3030,
  SERVER_URL: process.env.SERVER_URL || "http://localhost",

  SESSION_NAME: process.env.SESSION_NAME || "session",
  SESSION_SECRET: process.env.SESSION_SECRET || "dsadsadsasecretscadsasac",

  REDIS_HOST: process.env.HOST || "localhost",
  REDIS_PORT: process.env.SERVER_PORT || 6379,
  REDIS_TIME_TO_LIVE: 36000, //  60 * 60 in seconds

  PSQL_NAME: process.env.PSQL_NAME || "slack",
  PSQL_USER: process.env.PSQL_USER || "postgres",
  PSQL_PASS: process.env.PSQL_PASS || "postgres"
};
