import { createSelector } from "reselect";

import { getCurrentTeamMembers } from "./team.reducer";
import constants from "../constants";

const initialState = {
  isSideBarOpen: false,
  rightSideBarView: "team",
  targetUserId: null
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.TOGGLE_SIDE_BAR:
      newState.isSideBarOpen = !newState.isSideBarOpen;
      return newState;

    case constants.SWITCH_RIGHT_SIDE_BAR_VIEW:
      if (action.payload !== "user-profile") {
        newState.targetUserId = null;
      }
      newState.rightSideBarView = action.payload;
      return newState;

    case constants.SWITCH_TARGET_USER:
      newState.targetUserId = action.payload;
      return newState;

    case constants.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

/* state selectors */
const getIsSideBarOpen = state => state.globalStateReducer.isSideBarOpen;

const getRightSideBarView = state => state.globalStateReducer.rightSideBarView;

const getTargetUserId = state => state.globalStateReducer.targetUserId;

const getRightSideBarTitle = createSelector(
  getRightSideBarView,
  rightSideBarView =>
    rightSideBarView
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
  getIsSideBarOpen,
  getRightSideBarView,
  getRightSideBarTitle,
  getTargetUser
};
