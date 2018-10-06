import { apiV1 } from "./API";

export default {
  fetchEditUser: async editUserdata => {
    const response = await apiV1().put(`/users`, editUserdata);
    return response;
  },
  fetchAutoAuth: async () => {
    const response = await apiV1().get(`/users/auths`);
    return response;
  },
  fetchRegisterUser: async credentials => {
    const response = await apiV1().post(`/users/registers`, credentials);
    return response;
  },

  fetchLoginUser: async credentials => {
    const response = await apiV1().post(`/users/logins`, credentials);
    return response;
  },
  fetchLogoutUser: async () => {
    const response = await apiV1().get(`/users/logouts`);
    return response;
  }
};
