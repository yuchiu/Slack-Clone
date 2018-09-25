import constants from "../constants";

export default {
  toggleSideBar: () => dispatch => {
    dispatch({
      type: constants.TOGGLE_SIDE_BAR
    });
  }
};
