import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { globalStateAction } from "@/actions";

describe("globalState.action", () => {
  it("should clear socket connection", async () => {
    const dispatches = await Thunk(
      globalStateAction.clearSocketConnection
    ).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.GLOBAL_SOCKET_CONNECTION_CLEAR
    });
  });
});
