import * as Sequelize from "sequelize";

import { getNewId } from "./common";

export const TeamMemberFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TeamMemberInstance, TeamMemberAttributes> => {
  const attributes: SequelizeAttributes<TeamMemberAttributes> = {
    id: {
      type: DataTypes.STRING,
      defaultValue: getNewId,
      primaryKey: true
    },
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
