import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { userAction } from "@/actions";
import { userService } from "@/actions/services";

jest.mock("@/actions/services/user.service");

describe("user.action", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("userAction.fetchTryAutoSignIn - should try auto sign in user", async () => {
    userService.fetchTryAutoSignIn.mockReturnValueOnce({
      data: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
    const dispatches = await Thunk(userAction.fetchTryAutoSignIn).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_TRY_AUTO_SIGNIN,
      payload: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
  });

  it("userAction.fetchSignUpUser - should fetch sign up user", async () => {
    userService.fetchSignUpUser.mockReturnValueOnce({
      data: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
    const dispatches = await Thunk(userAction.fetchSignUpUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNIN
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
      payload: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
  });

  it("userAction.fetchSignInUser - should fetch sign in user", async () => {
    userService.fetchSignInUser.mockReturnValueOnce({
      data: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
    const dispatches = await Thunk(userAction.fetchSignInUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNIN
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
      payload: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
  });

  it("userAction.fetchOAuthLogin - should fetch sign in user with OAuth", async () => {
    userService.fetchOAuthLogin.mockReturnValueOnce({
      data: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
    const dispatches = await Thunk(userAction.fetchOAuthLogin).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNIN
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
      payload: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
  });
  it("userAction.fetchEditUser - should fetch edit user", async () => {
    userService.fetchEditUser.mockReturnValueOnce({
      data: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
    const dispatches = await Thunk(userAction.fetchEditUser).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_EDIT
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.USER_FETCH_EDIT_SUCCESS,
      payload: {
        id: 2,
        username: "tester",
        email: "tester@email.com",
        token: "dasasddasasdxxxx2324234sadads"
      }
    });
  });

  it("userAction.fetchSignOutUser - should fetch sign out user", async () => {
    const dispatches = await Thunk(userAction.fetchSignOutUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_SIGNOUT
    });
  });
});
