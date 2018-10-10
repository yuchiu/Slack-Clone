import * as Promise from "bluebird";
import * as redis from "redis";

const redisClient = Promise.promisifyAll(redis.createClient());

redisClient.on("error", err => {
  console.log(`Error ${err}`);
});

/* reset redis */
// redisClient.flushdb((err, succeeded) => {
//   console.log(`flush db: ${succeeded}`);
// });

export default redisClient;
