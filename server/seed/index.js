const Promise = require("bluebird");
const redis = require("redis");
require("dotenv").config();

const models = require("./models");
const users = require("./users.json");
const teams = require("./teams.json");
const initialTeams = require("./initialTeams.json");
const teamMembers = require("./teamMembers.json");
const channels = require("./channels.json");
const channelMembers = require("./channelMembers.json");

const redisClient = Promise.promisifyAll(redis.createClient());

redisClient.flushdb((err, succeeded) => {
  if (err) {
    console.log("error occured on redisClient.flushdb");
  } else console.log("✔ purge caches store in redis");
});

models.sequelize.sync({ force: true }).then(async () => {
  await Promise.all(users.map(user => models.User.create(user)));
  console.log("✔ users populated");
  await Promise.all(initialTeams.map(team => models.Team.create(team)));
  console.log("✔ initial team populated");
  await Promise.all(teams.map(team => models.Team.create(team)));
  console.log("✔ teams populated");
  await Promise.all(teamMembers.map(tm => models.TeamMember.create(tm)));
  console.log("✔ team members populated");
  await Promise.all(channels.map(channel => models.Channel.create(channel)));
  console.log("✔ channels populated");
  await Promise.all(channelMembers.map(cm => models.ChannelMember.create(cm)));
  console.log("✔ channelMembers populated");
  console.log("-----------------------------------------");
  console.log("Populated database with seed successfully");
  process.exit(0);
});
