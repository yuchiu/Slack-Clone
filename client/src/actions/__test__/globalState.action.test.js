import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { globalStateAction } from "@/actions";

describe("globalState.action", () => {
  it("globalStateAction.clearSocketConnection - should clear socket connection", async () => {
    const dispatches = await Thunk(
      globalStateAction.clearSocketConnection
    ).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GLOBAL_SOCKET_CONNECTION_CLEAR
    });
  });
  it("globalStateAction.switchTargetUser - should switch targetUser", async () => {
    const dispatches = await Thunk(globalStateAction.switchTargetUser).execute(
      31
    );
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GLOBAL_TARGET_USER_SWITCH,
      payload: 31
    });
  });
  it("globalStateAction.switchRightSidebarView - should switch right side bar view", async () => {
    const dispatches = await Thunk(
      globalStateAction.switchRightSidebarView
    ).execute("my-profile");
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_VIEW_SWITCH,
      payload: "my-profile"
    });
  });
  it("globalStateAction.toggleRightSidebar - should switch targetUser", async () => {
    const dispatches = await Thunk(
      globalStateAction.toggleRightSidebar
    ).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GLOBAL_RIGHT_SIDEBAR_TOGGLE
    });
  });
});
