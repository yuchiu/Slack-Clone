import * as Sequelize from "sequelize";
import { TeamMemberAttributes, TeamMemberInstance } from "./types";

export const TeamMemberFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TeamMemberInstance, TeamMemberAttributes> => {
  const attributes: SequelizeAttributes<TeamMemberAttributes> = {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  };
  const TeamMember = sequelize.define<TeamMemberInstance, TeamMemberAttributes>(
    "team_member",
    attributes
  );

  return TeamMember;
};
