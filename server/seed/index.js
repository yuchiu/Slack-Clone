const Promise = require("bluebird");
const redis = require("redis");
require("dotenv").config();

const models = require("./models");
const users = require("./users.json");
const initialTeam = require("./initialTeam.json");
const teamMembers = require("./teamMembers.json");
const initialChannel = require("./initialChannel.json");
const channelMembers = require("./channelMembers.json");

const redisClient = Promise.promisifyAll(
  redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
);

redisClient.flushdb((err, succeeded) => {
  if (err) {
    console.log("error occured on redisClient.flushdb");
  } else console.log("✔ purge caches store in redis");
});

models.sequelize.sync({ force: true }).then(async () => {
  /**
   * generate users
   */
  await Promise.all(users.map(user => models.User.create(user)));
  console.log("✔ users populated");
  const usersData = await models.User.findAll({ raw: true });

  /**
   * generate initial team
   */
  await Promise.all(initialTeam.map(team => models.Team.create(team)));
  console.log("✔ initial team populated");
  const initialTeamData = await models.Team.findAll({ raw: true });

  /**
   * generate initial channel under intial team
   */
  await Promise.all(
    initialChannel.map(channel => {
      const newChannel = { ...channel };
      newChannel.team_id = initialTeamData[0].id;
      return models.Channel.create(newChannel);
    })
  );
  console.log("✔ channels populated");
  const initialChannelsData = await models.Channel.findAll({ raw: true });

  /**
   * generate team members with initial team and users that were generated
   */
  let tmIndex = 0;
  await Promise.all(
    teamMembers.map(tm => {
      const newTm = { ...tm };
      newTm.team_id = initialTeamData[0].id;
      newTm.user_id = usersData[tmIndex].id;
      tmIndex++;
      return models.TeamMember.create(newTm);
    })
  );
  console.log("✔ team members populated");

  /**
   * generate channel members with initial channel and users that were generated
   */
  let userIndex = 0;
  await Promise.all(
    channelMembers.map(cm => {
      const newCm = { ...cm };
      newCm.channel_id = initialChannelsData[0].id;
      newCm.user_id = usersData[userIndex].id;
      userIndex++;
      return models.ChannelMember.create(newCm);
    })
  );
  console.log("✔ channelMembers populated");

  console.log("-----------------------------------------");
  console.log("Populated database with seed successfully");
  process.exit(0);
});
