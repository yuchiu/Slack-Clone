import constants from "@/constants";

export default {
  clearError: () => dispatch => {
    dispatch({
      type: constants.CLEAR_ERROR
    });
  }
};
