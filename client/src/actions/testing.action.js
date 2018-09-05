import constants from "@/constants";

export default {
  fetchText: text => dispatch => {
    dispatch({
      type: constants.FETCH_TEXT,
      payload: text
    });
  }
};
