import constants from "../constants";

const initialState = {
  isSidebarOpen: false,
  rightSidebarView: "team",
  targetUserId: null
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GLOBAL_RIGHT_SIDEBAR_TOGGLE:
      newState.isSidebarOpen = !newState.isSidebarOpen;
      return newState;

    case constants.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH:
      if (action.payload !== "user-profile") {
        newState.targetUserId = null;
      }
      newState.rightSidebarView = action.payload;
      return newState;

    case constants.GLOBAL_TARGET_USER_SWITCH:
      newState.targetUserId = action.payload;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
