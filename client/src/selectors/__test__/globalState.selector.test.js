import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getIsSidebarOpen } from "@/selectors/globalState.selector";

describe("globalState.selectors", () => {
  it("should get false with getIsSidebarOpen when state is empty", () => {
    Selector(getIsSidebarOpen)
      .expect(emptyState)
      .toReturn(false);
  });
});
