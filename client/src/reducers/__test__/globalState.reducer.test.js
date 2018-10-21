import globalStateReducer from "@/reducers/globalState.reducer";

const initialState = {
  isSidebarOpen: false,
  rightSidebarView: "team",
  targetUserId: null
};

describe("globalState.reducer initial state", () => {
  it("should have initial state", () => {
    expect(globalStateReducer(initialState, {})).toEqual(initialState);
  });
});
