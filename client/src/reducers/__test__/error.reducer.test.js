import { Reducer } from "redux-testkit";

import actionTypes from "@/actionTypes";
import errorReducer from "@/reducers/error.reducer";

const initialState = {
  error: ""
};

describe("error.reducer initial state", () => {
  it("should have initial state", () => {
    expect(errorReducer(initialState, {})).toEqual(initialState);
  });
  it("should handle ERROR_AUTH action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_AUTH,
      payload: "server error"
    };
    const state = initialState;
    const result = {
      error: "server error"
    };
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_USER action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_USER,
      payload: "server error"
    };
    const state = initialState;
    const result = {
      error: "server error"
    };
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_CHANNEL action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_CHANNEL,
      payload: "server error"
    };
    const state = initialState;
    const result = {
      error: "server error"
    };
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_MESSAGE action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_MESSAGE,
      payload: "server error"
    };
    const state = initialState;
    const result = {
      error: "server error"
    };
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_TEAM action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_TEAM,
      payload: "server error"
    };
    const state = initialState;
    const result = {
      error: "server error"
    };
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_CREATE action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_CREATE,
      payload: "server error"
    };
    const state = initialState;
    const result = {
      error: "server error"
    };
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_ALL_CLEAR action on existing state", () => {
    const action = {
      type: actionTypes.ERROR_ALL_CLEAR
    };
    const state = {
      error: "server error"
    };
    const result = {
      error: ""
    };
    Reducer(errorReducer)
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
    Reducer(errorReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
