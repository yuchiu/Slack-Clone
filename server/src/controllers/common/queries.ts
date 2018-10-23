export default {
  getTeamList: `
    SELECT 
    TEAMS.id, 
    TEAMS.name, 
    TEAMS.brief_description, 
    TEAMS.updated_at, 
    TEAMS.created_at, 
    TEAMS.updated_at, 
    TEAM_MEMBERS.admin 
    FROM TEAM_MEMBERS as team_members
    INNER JOIN TEAMS as teams
    ON teams.id = team_members.team_id 
    WHERE team_members.user_id = ?`,
  getInitialChannelId: `
    SELECT 
    CHANNELS.id 
    FROM CHANNELS 
    WHERE team_id = ? 
    ORDER BY created_at 
    LIMIT 1`,
  getTeamMemberList: `
    SELECT 
    USERS.id, 
    USERS.username, 
    USERS.email, 
    USERS.avatarurl, 
    USERS.online, 
    USERS.brief_description, 
    USERS.detail_description, 
    TEAM_MEMBERS.created_at, 
    TEAM_MEMBERS.admin
    FROM TEAM_MEMBERS AS team_members 
    JOIN USERS as users
    ON team_members.user_id = users.id 
    WHERE team_members.team_id = ?`,
  getChannelList: `
    SELECT DISTINCT ON (id)
    CHANNELS.id, 
    CHANNELS.name, 
    CHANNELS.public, 
    CHANNELS.message_group, 
    CHANNELS.brief_description, 
    CHANNELS.detail_description, 
    CHANNELS.created_at, 
    CHANNELS.updated_at, 
    CHANNELS.team_id
    FROM CHANNELS AS channels
    LEFT OUTER JOIN CHANNEL_MEMBERS AS channel_members
    ON channels.id = channel_members.channel_id
    WHERE channels.team_id = :teamId AND (channels.public = true OR channel_members.user_id = :userId);`,
  getChannelMemberList: `
    SELECT 
    USERS.id, 
    USERS.username, 
    USERS.email, 
    USERS.avatarurl, 
    USERS.online, 
    USERS.brief_description, 
    USERS.detail_description,  
    CHANNEL_MEMBERS.created_at, 
    CHANNEL_MEMBERS.channel_id
    FROM USERS AS users
    JOIN CHANNEL_MEMBERS AS channel_members
    ON channel_members.user_id = users.id 
    WHERE channel_members.channel_id = ?`
};
