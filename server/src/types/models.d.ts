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
    id?: number;
    name: string;
    public: boolean;
    messageGroup: boolean;
    brief_description: string;
    detail_description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface ChannelInstance
    extends Sequelize.Instance<ChannelAttributes>,
      ChannelAttributes {}

  /**
   * Message
   */
  interface MessageAttributes {
    id?: number;
    username: string;
    avatarurl: string;
    text: string;
    url: string;
    filetype: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface MessageInstance
    extends Sequelize.Instance<MessageAttributes>,
      MessageAttributes {}

  /**
   * Team
   */
  interface TeamAttributes {
    id?: number;
    name: string;
    brief_description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface TeamInstance
    extends Sequelize.Instance<TeamAttributes>,
      TeamAttributes {}

  /**
   * User
   */
  interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    avatarurl: string;
    online: boolean;
    brief_description: string;
    detail_description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
      UserAttributes {}

  /**
   * TeamMember
   */
  interface TeamMemberAttributes {
    id?: number;
    team_id?: number;
    user_id?: number;
    admin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface TeamMemberInstance
    extends Sequelize.Instance<TeamMemberAttributes>,
      TeamMemberAttributes {}

  /**
   * ChannelMember
   */
  interface ChannelMemberAttributes {
    id?: number;
    channel_id?: number;
    user_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
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