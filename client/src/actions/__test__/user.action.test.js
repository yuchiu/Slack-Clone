import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { userAction } from "@/actions";
import { userService } from "@/actions/services";

jest.mock("@/actions/services/user.service");

describe("user.action", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should log out user", async () => {
    userService.fetchLogoutUser.mockReturnValueOnce();
    const dispatches = await Thunk(userAction.fetchLogoutUser).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.USER_FETCH_LOGOUT
    });
  });
});
