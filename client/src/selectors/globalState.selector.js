import { createSelector } from "reselect";

import { getCurrentTeamMemberList } from "./team.selector";

/* state selectors */
const getTargetUserId = state => state.globalStateReducer.targetUserId;

export const getIsSidebarOpen = state => state.globalStateReducer.isSidebarOpen;

export const getRightSidebarView = state =>
  state.globalStateReducer.rightSidebarView;

export const getRightSidebarTitle = createSelector(
  getRightSidebarView,
  rightSidebarView =>
    rightSidebarView
      .replace(/-/g, " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
);

export const getTargetUser = createSelector(
  getCurrentTeamMemberList,
  getTargetUserId,
  (currentTeamMemberList, targetUserId) => {
    const targetUser = currentTeamMemberList.filter(
      teamMember => teamMember.id === targetUserId
    );
    return targetUser[0];
  }
);
