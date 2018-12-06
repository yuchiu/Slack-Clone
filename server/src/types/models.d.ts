import * as Sequelize from "sequelize";
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";

/**
 * global
 */
type SequelizeAttribute =
  | string
  | DataTypeAbstract
  | DefineAttributeColumnOptions;

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: SequelizeAttribute
  };

  /**
   * Channel
   */
  interface ChannelAttributes {
    id?: string;
    name?: string;
    public?: boolean;
    message_group?: boolean;
    brief_description?: string;
    detail_description?: string;
    team_id?: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface ChannelInstance
    extends Sequelize.Instance<ChannelAttributes>,
      ChannelAttributes {}

  /**
   * Message
   */
  interface MessageAttributes {
    id?: string;
    username: string;
    avatarurl?: string;
    text?: string;
    url?: string;
    filetype?: string;
    channel_id?: string;
    user_id?: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface MessageInstance
    extends Sequelize.Instance<MessageAttributes>,
      MessageAttributes {}

  /**
   * Team
   */
  interface TeamAttributes {
    id?: string;
    name: string;
    brief_description?: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface TeamInstance
    extends Sequelize.Instance<TeamAttributes>,
      TeamAttributes {}

  /**
   * User
   */
  interface UserAttributes {
    id?: string;
    username: string;
    email: string;
    password: string;
    avatarurl?: string;
    online?: boolean;
    provider?: string;
    access_token?: string;
    brief_description?: string;
    detail_description?: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
      UserAttributes {}

  /**
   * TeamMember
   */
  interface TeamMemberAttributes {
    id?: string;
    team_id?: string;
    user_id?: string;
    admin?: boolean;
    created_at?: Date;
    updated_at?: Date;
  }

  interface TeamMemberInstance
    extends Sequelize.Instance<TeamMemberAttributes>,
      TeamMemberAttributes {}

  /**
   * ChannelMember
   */
  interface ChannelMemberAttributes {
    id?: string;
    channel_id?: string;
    user_id?: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface ChannelMemberInstance
    extends Sequelize.Instance<ChannelMemberAttributes>,
      ChannelMemberAttributes {}

  interface DbInterface {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    Team: Sequelize.Model<TeamInstance, TeamAttributes>;
    Channel: Sequelize.Model<ChannelInstance, ChannelAttributes>;
    Message: Sequelize.Model<MessageInstance, MessageAttributes>;
    TeamMember: Sequelize.Model<TeamMemberInstance, TeamMemberAttributes>;
    ChannelMember: Sequelize.Model<
      ChannelMemberInstance,
      ChannelMemberAttributes
    >;
  }
}
