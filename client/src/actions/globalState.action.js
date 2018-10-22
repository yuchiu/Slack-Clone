import actionTypes from "../actionTypes";
import { globalStateService } from "./services";

export default {
  /**
   * Local
   */
  toggleRightSidebar: () => dispatch => {
    dispatch({
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_TOGGLE
    });
  },
  switchRightSidebarView: selectedView => dispatch => {
    dispatch({
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH,
      payload: selectedView
    });
  },
  switchTargetUser: targetUserId => dispatch => {
    dispatch({
      type: actionTypes.GLOBAL_TARGET_USER_SWITCH,
      payload: targetUserId
    });
  },

  /**
   * Web Socket with Socket.io
   */
  clearSocketConnection: () => dispatch => {
    globalStateService.clearSocketConnection();
    dispatch({
      type: actionTypes.GLOBAL_SOCKET_CONNECTION_CLEAR
    });
  }
};
