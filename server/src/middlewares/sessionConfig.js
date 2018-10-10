import connectRedis from "connect-redis";
import session from "express-session";

import redisClient from "../config/redisClient";
import {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_TIME_TO_LIVE,
  SESSION_SECRET,
  SESSION_NAME
} from "../utils/secrets";

const RedisStore = connectRedis(session);

export default () =>
  session({
    store: new RedisStore({
      client: redisClient,
      port: REDIS_PORT,
      host: REDIS_HOST,
      ttl: REDIS_TIME_TO_LIVE
    }),
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      path: "/",
      secure: false,
      maxAge: 604800000 // 1000 * 60 * 60 * 24 * 7 in milliseconds
    }
  });
