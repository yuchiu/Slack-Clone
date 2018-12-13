import { apiV1 } from "./API";

export default {
  fetchEditUser: async editUserdata => {
    const response = await apiV1().put(
      `/users/${editUserdata.currentUserId}`,
      editUserdata
    );
    return response;
  },
  fetchTryAutoSignIn: async () => {
    const response = await apiV1().get(`/users/auth`);
    return response;
  },
  fetchSignUpUser: async credentials => {
    const response = await apiV1().post(`/users/signup`, credentials);
    return response;
  },

  fetchSignInUser: async credentials => {
    const response = await apiV1().post(`/users/signin`, credentials);
    return response;
  },
  fetchOAuthLogin: async credentials => {
    const response = await apiV1().post(`/users/oauth`, credentials);
    return response;
  },
  fetchSignOutUser: async () => {
    const response = await apiV1().get(`/users/signout`);
    return response;
  }
};
