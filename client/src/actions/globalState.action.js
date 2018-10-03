import constants from "../constants";
import { globalStateService } from "./services";

export default {
  toggleRightSidebar: () => dispatch => {
    dispatch({
      type: constants.RIGHT_SIDEBAR_TOGGLE
    });
  },
  switchRightSidebarView: selectedView => dispatch => {
    dispatch({
      type: constants.RIGHT_SIDEBAR_VIEW_SWITCH,
      payload: selectedView
    });
  },
  toggleEditModal: () => dispatch => {
    dispatch({
      type: constants.EDIT_MODAL_TOGGLE
    });
  },
  switchTargetUser: targetUserId => dispatch => {
    dispatch({
      type: constants.TARGET_USER_SWITCH,
      payload: targetUserId
    });
  },
  clearSocketConnection: () => dispatch => {
    globalStateService.clearSocketConnection();
    dispatch({
      type: constants.SOCKET_CONNECTION_CLEAR
    });
  }
};
