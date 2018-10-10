import winston from "winston";
import { ENVIRONMENT } from "./secrets";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" })
  ]
});

if (ENVIRONMENT !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
