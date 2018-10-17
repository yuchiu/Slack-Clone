import constants from "@/constants";

export default {
  /**
   * Local
   */
  clearAllError: () => dispatch => {
    dispatch({
      type: constants.ERROR_ALL_CLEAR
    });
  },
  createUploadError: text => dispatch => {
    dispatch({
      type: constants.ERROR_UPLOAD,
      payload: text
    });
  }
};
