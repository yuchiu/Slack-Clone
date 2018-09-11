export default {
  /* save logged in status */
  setUserLoggedIn: () => {
    sessionStorage.setItem("loginStatus", true);
  },
  /* remove log in status */
  setUserLoggedOut: () => {
    sessionStorage.removeItem("loginStatus", false);
  },
  /* Check if a user is loggedin */
  getLoginStatus: () => sessionStorage.getItem("loginStatus") === "true",

  /* save user has team */
  setTeamId: id => {
    sessionStorage.setItem("teamId", id);
  },
  /* set user has no team */
  removeTeamId: () => {
    sessionStorage.setItem("teamId", 0);
  },
  /* check if user has team */
  getTeamId: () => sessionStorage.getItem("teamId")
};
