import teamReducer from "@/reducers/team.reducer";

const initialState = {
  teamList: [],
  currentTeam: {},
  currentTeamMemberList: [],
  isLoading: false
};

describe("team.reducer initial state", () => {
  it("should have initial state", () => {
    expect(teamReducer(initialState, {})).toEqual(initialState);
  });
});
