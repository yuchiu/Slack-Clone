import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { errorAction } from "@/actions";

describe("error.action", () => {
  it("should create error locally", async () => {
    const dispatches = await Thunk(errorAction.createError).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.ERROR_CREATE
    });
  });
});
