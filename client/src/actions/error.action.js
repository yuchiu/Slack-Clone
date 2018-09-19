import constants from "@/constants";

export default {
  clearError: () => dispatch => {
    dispatch({
      type: constants.CLEAR_ERROR
    });
  },
  fetchError: text => dispatch => {
    dispatch({
      type: constants.UPLOAD_ERROR,
      payload: text
    });
  }
};
