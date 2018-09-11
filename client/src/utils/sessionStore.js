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
  setTeamToTrue: () => {
    sessionStorage.setItem("isTeamSet", true);
  },
  /* set user has no team */
  setTeamToFalse: () => {
    sessionStorage.setItem("isTeamSet", false);
  },
  /* check if user has team */
  getTeamStatus: () => sessionStorage.getItem("isTeamSet") === "true"
};
