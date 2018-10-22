import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { teamAction } from "@/actions";

describe("team.action", () => {
  it("should switch current team", async () => {
    const dispatches = await Thunk(teamAction.switchTeam).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TEAM_SWITCH
    });
  });
});
