import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { errorAction } from "@/actions";

describe("error.action", () => {
  it("errorAction.createError - should create error", async () => {
    const dispatches = await Thunk(errorAction.createError).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.ERROR_CREATE
    });
  });
  it("errorAction.clearAllError - should create error", async () => {
    const dispatches = await Thunk(errorAction.clearAllError).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.ERROR_ALL_CLEAR
    });
  });
});
