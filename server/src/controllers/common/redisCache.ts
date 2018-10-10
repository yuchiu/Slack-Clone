import redisClient from "../../config/redisClient";

export default {
  set: async (key, data) => {
    await redisClient.setex(
      `${key}`,
      86400, // 60 * 60 * 24 seconds
      JSON.stringify({ ...data })
    );
  },

  get: key => redisClient.getAsync(`${key}`),

  delete: key => {
    redisClient.del(`${key}`, (err, reply) => {
      if (!err) {
        if (reply === 1) {
          console.log(`${key} is deleted`);
        } else {
          console.log(`${key} doesn't exists`);
        }
      }
    });
  }
};
