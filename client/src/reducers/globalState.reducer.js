import actionTypes from "../actionTypes";

const initialState = {
  isSidebarOpen: false,
  rightSidebarView: "team",
  targetUserId: null
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.GLOBAL_RIGHT_SIDEBAR_TOGGLE:
      newState.isSidebarOpen = !newState.isSidebarOpen;
      return newState;

    case actionTypes.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH:
      if (action.payload !== "user-profile") {
        newState.targetUserId = null;
      }
      newState.rightSidebarView = action.payload;
      return newState;

    case actionTypes.GLOBAL_TARGET_USER_SWITCH:
      newState.targetUserId = action.payload;
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};
