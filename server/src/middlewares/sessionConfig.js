import connectRedis from "connect-redis";
import session from "express-session";

import config from "../config";
import { redisClient } from "../utils";

const RedisStore = connectRedis(session);

export default () =>
  session({
    store: new RedisStore({
      client: redisClient,
      port: config.REDIS_PORT,
      host: config.REDIS_HOST,
      ttl: config.REDIS_TIME_TO_LIVE
    }),
    secret: config.SESSION_SECRET,
    name: config.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      path: "/",
      secure: false,
      maxAge: 604800000 // 1000 * 60 * 60 * 24 * 7 in milliseconds
    }
  });
