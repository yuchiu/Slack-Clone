import { APIV1 } from "./API";

export default {
  createTeam: async teamFormInfo => {
    const response = await APIV1().post(`/teams`, teamFormInfo);
    return response;
  }
};
