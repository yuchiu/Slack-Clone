export default {
  updateMessageUseravatar: `
    UPDATE messages 
    SET avatarurl=:newurl 
    WHERE messages.user_id = :userId
    RETURNING *
  `,
  getEstablishedMessageGroup: `
    SELECT c.id, c.name
    FROM CHANNELS as c, CHANNEL_MEMBERS cm
    WHERE cm.channel_id = c.id AND c.message_group = true AND c.public = false AND c.team_id = :teamId
    GROUP BY c.id, c.name
    HAVING ARRAY_AGG(cm.user_id) @> ARRAY[:allMembers]::varchar[] AND COUNT(cm.user_id) = :allMembersLength;
  `,
  getTeamList: `
    SELECT 
    teams.id, 
    teams.name, 
    teams.brief_description, 
    teams.updated_at, 
    teams.created_at, 
    teams.updated_at, 
    team_members.admin 
    FROM team_members
    INNER JOIN teams
    ON teams.id = team_members.team_id 
    WHERE team_members.user_id = ?`,
  getInitialTeamId: `
    SELECT 
    teams.id 
    FROM teams
    ORDER BY created_at 
    LIMIT 1`,
  getPublicChannelList: `
    SELECT 
    channels.id 
    FROM channels
    WHERE team_id = ? AND channels.public = true
    ORDER BY created_at`,
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
    FROM team_members 
    JOIN users
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
    FROM channels
    LEFT OUTER JOIN channel_members
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
    FROM users
    JOIN channel_members
    ON channel_members.user_id = users.id 
    WHERE channel_members.channel_id = ?`
};
