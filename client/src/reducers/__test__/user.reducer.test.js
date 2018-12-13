import { Reducer } from "redux-testkit";

import actionTypes from "@/actionTypes";
import { userReducer } from "@/reducers";

const initialState = {
  currentUser: {},
  isLoading: false
};

describe("user.reducer initial state", () => {
  it("should have initial state", () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });
  it("should handle USER_FETCH_TRY_AUTO_SIGNIN action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_TRY_AUTO_SIGNIN,
      payload: {
        user: {
          id: 2,
          username: "tester",
          email: "tester@email.com"
        },
        token: "dasasddasasdxxxx2324234sadads"
      }
    };
    const state = {
      currentUser: {},
      isLoading: false
    };
    const result = {
      currentUser: { id: 2, email: "tester@email.com", username: "tester" },
      isLoading: false
    };
    Reducer(userReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNIN action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNIN
    };
    const result = {
      currentUser: {},
      isLoading: true
    };
    Reducer(userReducer)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNIN_SUCCESS action on existing state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
      payload: {
        user: {
          id: 2,
          username: "tester",
          email: "tester@email.com"
        },
        token: "dasasddasasdxxxx2324234sadads"
      }
    };
    const state = {
      currentUser: {},
      isLoading: true
    };
    const result = {
      currentUser: { id: 2, email: "tester@email.com", username: "tester" },
      isLoading: false
    };
    Reducer(userReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNOUT action on existing state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNOUT
    };
    const state = {
      currentUser: { id: 2, email: "tester@email.com", username: "tester" },
      isLoading: false
    };
    const result = {
      currentUser: {},
      isLoading: false
    };
    Reducer(userReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
