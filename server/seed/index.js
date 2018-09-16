import Promise from "bluebird";
import models from "../src/models";

import users from "./users.json";
import teams from "./teams.json";
import members from "./members.json";
import channels from "./channels.json";
import channelMembers from "./channelMembers.json";

models.sequelize.sync({ force: true }).then(async () => {
  await Promise.all(users.map(user => models.User.create(user)));
  console.log("✔ users populated");
  await Promise.all(teams.map(team => models.Team.create(team)));
  console.log("✔ teams populated");
  await Promise.all(members.map(member => models.Member.create(member)));
  console.log("✔ members populated");
  await Promise.all(channels.map(channel => models.Channel.create(channel)));
  console.log("✔ channels populated");
  await Promise.all(channelMembers.map(cm => models.ChannelMember.create(cm)));
  console.log("✔ channelMembers populated");
  console.log("-----------------------------------------");
  console.log("Populated database with seed successfully");
  process.exit(0);
});
