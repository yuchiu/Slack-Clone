import { Selector } from "redux-testkit";

import { globalStateSelector } from "@/selectors/";

const state = {
  teamReducer: {
    currentTeamMemberList: [{ id: "someuserid" }]
  },
  globalStateReducer: {
    isSidebarOpen: false,
    rightSidebarView: "user-profile",
    targetUserId: "someuserid"
  }
};

describe("globalState.selectors", () => {
  it("should getIsSidebarOpen", () => {
    const result = false;
    Selector(globalStateSelector.getIsSidebarOpen)
      .expect(state)
      .toReturn(result);
  });

  it("should getRightSidebarView", () => {
    const result = "user-profile";
    Selector(globalStateSelector.getRightSidebarView)
      .expect(state)
      .toReturn(result);
  });

  it("should getRightSidebarTitle", () => {
    const result = "User Profile";
    Selector(globalStateSelector.getRightSidebarTitle)
      .expect(state)
      .toReturn(result);
  });

  it("should getTargetUser", () => {
    const result = { id: "someuserid" };
    Selector(globalStateSelector.getTargetUser)
      .expect(state)
      .toReturn(result);
  });
});
