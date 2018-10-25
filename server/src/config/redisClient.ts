import * as Promise from "bluebird";
import * as redis from "redis";
import { REDIS_PORT, REDIS_HOST } from "../utils/secrets";

const redisClient = Promise.promisifyAll(
  redis.createClient(REDIS_PORT, REDIS_HOST)
);

redisClient.on("error", err => {
  console.log(`Error ${err}`);
});

/* reset redis */
// redisClient.flushdb((err, succeeded) => {
//   console.log(`flush db: ${succeeded}`);
// });

export default redisClient;
