export default {
  /* Authenticate a user. Save a token string in Local Storage */
  authenticateUser: data => {
    localStorage.setItem("token", data.token);
  },

  /* Deauthenticate a user. Remove token and email from Local Storage. */
  deauthenticateUser: () => {
    localStorage.removeItem("token");
  },

  /* Get a token value. */
  getToken: () => localStorage.getItem("token")
};
