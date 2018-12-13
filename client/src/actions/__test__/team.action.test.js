import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { teamAction } from "@/actions";
import { teamService } from "@/actions/services";

jest.mock("@/actions/services/team.service");

describe("team.action", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("teamAction.switchTeam - should switch current team", async () => {
    const dispatches = await Thunk(teamAction.switchTeam).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TEAM_SWITCH
    });
  });
  it("teamAction.fetchCreateTeam - should fetch create team from server", async () => {
    teamService.fetchCreateTeam.mockReturnValueOnce({
      data: {
        teamList: [],
        teamMemberList: [],
        team: {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      }
    });
    const dispatches = await Thunk(teamAction.fetchCreateTeam).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TEAM_FETCH_CREATE
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.TEAM_FETCH_CREATE_SUCCESS,
      payload: {
        teamList: [],
        teamMemberList: [],
        team: {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      }
    });
  });
  it("teamAction.fetchTeamAssociatedList - should fetch team associated list from server", async () => {
    teamService.fetchTeamAssociatedList.mockReturnValueOnce({
      data: {
        channelList: [],
        teamMemberList: []
      }
    });
    const dispatches = await Thunk(
      teamAction.fetchTeamAssociatedList
    ).execute();
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS,
      payload: {
        channelList: [],
        teamMemberList: []
      }
    });
  });
});
