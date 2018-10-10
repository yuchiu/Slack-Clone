import * as winston from "winston";
import { NODE_ENV } from "./secrets";
import { createLogger, Logger } from "winston";

const logger: Logger = createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" })
  ]
});

if (NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
