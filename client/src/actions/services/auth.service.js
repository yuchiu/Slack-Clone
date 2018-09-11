import { APIV1 } from "./API";

export default {
  autoAuth: async () => {
    const response = await APIV1().get(`/auth`);
    return response;
  },
  registerUser: async credentials => {
    const response = await APIV1().post(`/auth`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await APIV1().post(
      `/auth/${credentials.username}`,
      credentials
    );
    return response;
  }
};
