import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config();
} else {
  logger.debug(
    "No .env file. Create an .env file to supply config environment variables"
  );
}

let NODE_ENV = "development";
if (process.env.NODE_ENV) {
  NODE_ENV = process.env.NODE_ENV;
}

let SERVER_PORT;
process.env.SERVER_PORT
  ? (SERVER_PORT = process.env.SERVER_PORT)
  : (SERVER_PORT = 3030);

let SERVER_URL;
process.env.SERVER_URL
  ? (SERVER_URL = process.env.SERVER_URL)
  : (SERVER_URL = "http://localhost");

const { SESSION_NAME } = process.env;
const { SESSION_SECRET } = process.env;

const { REDIS_HOST } = process.env;
const { REDIS_PORT } = process.env;
const { REDIS_TIME_TO_LIVE } = process.env;

const { PSQL_NAME } = process.env;
const { PSQL_USER } = process.env;
const { PSQL_PASS } = process.env;

if (!process.env.SERVER_PORT) {
  logger.debug(
    "Environment variable SERVER_PORT does not exist. Using default 3030 as server's port. Set SERVER_PORT environment variable."
  );
}
if (!process.env.SERVER_URL) {
  logger.debug(
    "Environment variable SERVER_URL does not exist. Using default http//localhost as server's url. Set SERVER_URL environment variable."
  );
}

if (!SESSION_NAME) {
  logger.debug("No SESSION_NAME. Set SESSION_NAME environment variable.");
  process.exit(1);
}
if (!SESSION_SECRET) {
  logger.debug("No SESSION_SECRET. Set SESSION_SECRET environment variable.");
  process.exit(1);
}
if (!REDIS_HOST) {
  logger.debug("No REDIS_HOST. Set REDIS_HOST environment variable.");
  process.exit(1);
}
if (!REDIS_PORT) {
  logger.debug("No REDIS_PORT. Set REDIS_PORT environment variable.");
  process.exit(1);
}
if (!REDIS_TIME_TO_LIVE) {
  logger.debug(
    "No REDIS_TIME_TO_LIVE. Set REDIS_TIME_TO_LIVE environment variable."
  );
  process.exit(1);
}
if (!PSQL_NAME) {
  logger.debug("No PSQL_NAME. Set PSQL_NAME environment variable.");
  process.exit(1);
}
if (!PSQL_USER) {
  logger.debug("No PSQL_USER. Set PSQL_USER environment variable.");
  process.exit(1);
}
if (!PSQL_PASS) {
  logger.debug("No PSQL_PASS. Set PSQL_PASS environment variable.");
  process.exit(1);
}

export {
  NODE_ENV,
  SERVER_PORT,
  SERVER_URL,
  SESSION_NAME,
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_TIME_TO_LIVE,
  PSQL_NAME,
  PSQL_USER,
  PSQL_PASS
};
