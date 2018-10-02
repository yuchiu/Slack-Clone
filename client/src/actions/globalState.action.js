import constants from "../constants";

export default {
  toggleSideBar: () => dispatch => {
    dispatch({
      type: constants.TOGGLE_SIDE_BAR
    });
  },
  switchRightSideBarView: selectedView => dispatch => {
    dispatch({
      type: constants.SWITCH_RIGHT_SIDE_BAR_VIEW,
      payload: selectedView
    });
  },
  switchTargetUser: targetUserId => dispatch => {
    dispatch({
      type: constants.SWITCH_TARGET_USER,
      payload: targetUserId
    });
  }
};
