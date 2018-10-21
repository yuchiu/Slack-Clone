import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getIsUserLoggedIn } from "@/selectors/auth.selector";

describe("auth.selectors", () => {
  it("should get false with getIsUserLoggedIn when state is empty", () => {
    Selector(getIsUserLoggedIn)
      .expect(emptyState)
      .toReturn(false);
  });
});
