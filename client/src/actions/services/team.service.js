import { APIV1 } from "./API";

export default {
  fetchCreateTeam: async teamFormInfo => {
    const response = await APIV1().post(`/teams`, teamFormInfo);
    return response;
  },
  fetchAddTeamMember: async addMemberInfo => {
    const response = await APIV1().post(`/teams/members`, addMemberInfo);
    return response;
  },
  fetchTeamAssociatedList: async teamId => {
    const response = await APIV1().get(`/teams/${teamId}`);
    return response;
  }
};
