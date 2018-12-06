import { apiV1 } from "./API";

export default {
  fetchEditUser: async editUserdata => {
    const response = await apiV1().put(
      `/users/${editUserdata.currentUserId}`,
      editUserdata
    );
    return response;
  },
  fetchAutoAuth: async () => {
    const response = await apiV1().get(`/users/auth`);
    return response;
  },
  fetchRegisterUser: async credentials => {
    const response = await apiV1().post(`/users/signup`, credentials);
    return response;
  },

  fetchLoginUser: async credentials => {
    const response = await apiV1().post(`/users/signin`, credentials);
    return response;
  },
  fetchOAuthLogin: async credentials => {
    const response = await apiV1().post(`/users/oauth`, credentials);
    return response;
  },
  fetchLogoutUser: async () => {
    const response = await apiV1().get(`/users/signout`);
    return response;
  }
};
