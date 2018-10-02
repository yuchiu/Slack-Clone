import { APIV1 } from "./API";

export default {
  fetchAutoAuth: async () => {
    const response = await APIV1().get(`/users`);
    return response;
  },
  fetchRegisterUser: async credentials => {
    const response = await APIV1().post(`/users/registers`, credentials);
    return response;
  },

  fetchLoginUser: async credentials => {
    const response = await APIV1().post(`/users/logins`, credentials);
    return response;
  },
  fetchLogoutUser: async () => {
    const response = await APIV1().get(`/users/logouts`);
    return response;
  }
};
