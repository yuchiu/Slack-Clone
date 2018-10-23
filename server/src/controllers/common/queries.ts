export default {
  getTeamList: `
    SELECT 
    teams.id, 
    teams.name, 
    teams.brief_description, 
    teams.updated_at, 
    teams.created_at, 
    teams.updated_at, 
    team_members.admin 
    FROM TEAM_MEMBERS as team_members
    INNER JOIN TEAMS as teams
    ON teams.id = team_members.team_id 
    WHERE team_members.user_id = ?`,
  getInitialChannelId: `
    SELECT 
    channels.id 
    FROM CHANNELS AS channels
    WHERE team_id = ? 
    ORDER BY created_at 
    LIMIT 1`,
  getInitialTeamId: `
    SELECT 
    teams.id 
    FROM TEAMS AS teams
    WHERE team_id = ? 
    ORDER BY created_at 
    LIMIT 1`,
  getTeamMemberList: `
    SELECT 
    users.id, 
    users.username, 
    users.email, 
    users.avatarurl, 
    users.online, 
    users.brief_description, 
    users.detail_description, 
    team_members.created_at, 
    team_members.admin
    FROM TEAM_MEMBERS AS team_members 
    JOIN USERS as users
    ON team_members.user_id = users.id 
    WHERE team_members.team_id = ?`,
  getChannelList: `
    SELECT DISTINCT ON (id)
    channels.id, 
    channels.name, 
    channels.public, 
    channels.message_group, 
    channels.brief_description, 
    channels.detail_description, 
    channels.created_at, 
    channels.updated_at, 
    channels.team_id
    FROM CHANNELS AS channels
    LEFT OUTER JOIN CHANNEL_MEMBERS AS channel_members
    ON channels.id = channel_members.channel_id
    WHERE channels.team_id = :teamId AND (channels.public = true OR channel_members.user_id = :userId);`,
  getChannelMemberList: `
    SELECT 
    users.id, 
    users.username, 
    users.email, 
    users.avatarurl, 
    users.online, 
    users.brief_description, 
    users.detail_description,  
    channel_members.created_at, 
    channel_members.channel_id
    FROM USERS AS users
    JOIN CHANNEL_MEMBERS AS channel_members
    ON channel_members.user_id = users.id 
    WHERE channel_members.channel_id = ?`
};
