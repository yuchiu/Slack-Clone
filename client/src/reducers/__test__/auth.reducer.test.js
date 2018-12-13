import { Reducer } from "redux-testkit";

import actionTypes from "@/actionTypes";
import authReducer from "@/reducers/auth.reducer";

const initialState = {
  isUserLoggedIn: false,
  isLoading: false
};

describe("auth.reducer initial state", () => {
  it("should have initial state", () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle USER_FETCH_TRY_AUTO_SIGNIN action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_TRY_AUTO_SIGNIN
    };
    const state = initialState;
    const result = {
      isUserLoggedIn: true,
      isLoading: false
    };
    Reducer(authReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNIN action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNIN
    };
    const state = initialState;
    const result = {
      isUserLoggedIn: false,
      isLoading: true
    };
    Reducer(authReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNIN_SUCCESS action on existing state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNIN_SUCCESS
    };
    const state = {
      isUserLoggedIn: false,
      isLoading: true
    };
    const result = {
      isUserLoggedIn: true,
      isLoading: false
    };
    Reducer(authReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNOUT action on existing state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNOUT
    };
    const state = {
      isUserLoggedIn: true,
      isLoading: false
    };
    const result = {
      isUserLoggedIn: false,
      isLoading: false
    };
    Reducer(authReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_AUTH action on existing state", () => {
    const action = {
      type: actionTypes.ERROR_AUTH
    };
    const state = {
      isUserLoggedIn: false,
      isLoading: true
    };
    const result = {
      isUserLoggedIn: false,
      isLoading: false
    };
    Reducer(authReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
