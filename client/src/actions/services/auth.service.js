import { APIV1 } from "./API";

export default {
  autoAuth: async () => {
    const response = await APIV1().get(`/users`);
    return response;
  },
  registerUser: async credentials => {
    const response = await APIV1().post(`/users`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await APIV1().post(
      `/users/${credentials.username}`,
      credentials
    );
    return response;
  }
};
