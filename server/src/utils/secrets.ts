import * as dotenv from "dotenv";
import * as fs from "fs";
import logger from "./logger";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config();
} else {
  logger.debug(
    "No .env file. Create an .env file to supply config environment variables"
  );
}

// env is default to "development" unless env is specified
export let NODE_ENV;
process.env.NODE_ENV
  ? (NODE_ENV = process.env.NODE_ENV)
  : (NODE_ENV = "development");

// server url is default to "http://localhost" unless env is specified
export let SERVER_URL;
process.env.SERVER_URL
  ? (SERVER_URL = process.env.SERVER_URL)
  : (SERVER_URL = "http://localhost");

// port is default to 3030 unless env is specified
export let SERVER_PORT;
process.env.SERVER_PORT
  ? (SERVER_PORT = process.env.SERVER_PORT)
  : (SERVER_PORT = 3030);

export const { FACEBOOK_CLIENT_ID } = process.env;
export const { FACEBOOK_CLIENT_SECRET } = process.env;

export const { SESSION_NAME } = process.env;
export const { SESSION_SECRET } = process.env;

export const { REDIS_HOST } = process.env;
export const { REDIS_PORT } = process.env;
export const { REDIS_TIME_TO_LIVE } = process.env;

export const { PSQL_NAME } = process.env;
export const { PSQL_USER } = process.env;
export const { PSQL_PASS } = process.env;
export const { PSQL_HOST } = process.env;

if (!SERVER_PORT) {
  logger.debug(
    "Environment variable SERVER_PORT does not exist. Using default 3030 as server's port. Set SERVER_PORT environment variable."
  );
}
if (!SERVER_URL) {
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
