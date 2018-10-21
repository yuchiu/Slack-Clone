import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getTeamIsLoading } from "@/selectors/team.selector";

describe("team.selectors", () => {
  it("should get false with getTeamIsLoading when state is empty", () => {
    Selector(getTeamIsLoading)
      .expect(emptyState)
      .toReturn(false);
  });
});
