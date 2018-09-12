import { APIV1 } from "./API";

export default {
  createTeam: async teamFormInfo => {
    const response = await APIV1().post(`/teams`, teamFormInfo);
    return response;
  },
  addTeamMember: async addMemberInfo => {
    const response = await APIV1().post(`/teams/members`, addMemberInfo);
    return response;
  },
  getTeamAssociatedList: async teamId => {
    const response = await APIV1().get(`/teams/${teamId}`);
    return response;
  }
};
