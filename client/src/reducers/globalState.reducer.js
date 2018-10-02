import { createSelector } from "reselect";

import { getCurrentTeamMembers } from "./team.reducer";
import constants from "../constants";

const initialState = {
  isSidebarOpen: false,
  rightSidebarView: "team",
  targetUserId: null
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.RIGHT_SIDEBAR_TOGGLE:
      newState.isSidebarOpen = !newState.isSidebarOpen;
      return newState;

    case constants.RIGHT_SIDEBAR_VIEW_SWITCH:
      if (action.payload !== "user-profile") {
        newState.targetUserId = null;
      }
      newState.rightSidebarView = action.payload;
      return newState;

    case constants.TARGET_USER_SWITCH:
      newState.targetUserId = action.payload;
      return newState;

    case constants.USER_LOGOUT_FETCH:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getIsSidebarOpen = state => state.globalStateReducer.isSidebarOpen;

const getRightSidebarView = state => state.globalStateReducer.rightSidebarView;

const getTargetUserId = state => state.globalStateReducer.targetUserId;

const getRightSidebarTitle = createSelector(
  getRightSidebarView,
  rightSidebarView =>
    rightSidebarView
      .replace(/-/g, " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
);

const getTargetUser = createSelector(
  getCurrentTeamMembers,
  getTargetUserId,
  (currentTeamMembers, targetUserId) => {
    const targetUser = currentTeamMembers.filter(
      teamMember => teamMember.id === targetUserId
    );
    return targetUser[0];
  }
);

export {
  getIsSidebarOpen,
  getRightSidebarView,
  getRightSidebarTitle,
  getTargetUser
};
