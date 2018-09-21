import Promise from "bluebird";
import models from "../src/models";

import users from "./users.json";
import teams from "./teams.json";
import initialTeams from "./initialTeams.json";
import teamMembers from "./teamMembers.json";
import channels from "./channels.json";
import channelMembers from "./channelMembers.json";

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
