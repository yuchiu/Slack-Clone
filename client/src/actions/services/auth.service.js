import { APIV1 } from "./API";

export default {
  autoAuth: async () => {
    const response = await APIV1().get(`/auths`);
    return response;
  },
  registerUser: async credentials => {
    const response = await APIV1().post(`/auths`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await APIV1().post(
      `/auths/${credentials.username}`,
      credentials
    );
    return response;
  }
};
