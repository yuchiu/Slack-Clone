import { Reducer } from "redux-testkit";

import actionTypes from "@/actionTypes";
import globalStateReducer from "@/reducers/globalState.reducer";

const initialState = {
  isSidebarOpen: false,
  rightSidebarView: "team",
  targetUserId: null
};

describe("globalState.reducer initial state", () => {
  it("should have initial state", () => {
    expect(globalStateReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle GLOBAL_RIGHT_SIDEBAR_TOGGLE action on initial state", () => {
    const action = {
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_TOGGLE
    };
    const state = initialState;
    const result = {
      isSidebarOpen: true,
      rightSidebarView: "team",
      targetUserId: null
    };
    Reducer(globalStateReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH action on initial state", () => {
    const action = {
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH,
      payload: "user-profile"
    };
    const state = initialState;
    const result = {
      isSidebarOpen: false,
      rightSidebarView: "user-profile",
      targetUserId: null
    };
    Reducer(globalStateReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH action on initial state", () => {
    const action = {
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH,
      payload: "team"
    };
    const state = initialState;
    const result = {
      isSidebarOpen: false,
      rightSidebarView: "team",
      targetUserId: null
    };
    Reducer(globalStateReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle GLOBAL_TARGET_USER_SWITCH action on initial state", () => {
    const action = {
      type: actionTypes.GLOBAL_TARGET_USER_SWITCH,
      payload: "dsadasd1111111"
    };
    const state = initialState;
    const result = {
      isSidebarOpen: false,
      rightSidebarView: "team",
      targetUserId: "dsadasd1111111"
    };
    Reducer(globalStateReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNOUT action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNOUT
    };
    const state = initialState;
    const result = initialState;
    Reducer(globalStateReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
