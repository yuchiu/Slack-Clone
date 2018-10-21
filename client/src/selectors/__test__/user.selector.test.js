import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getUserIsLoading } from "@/selectors/user.selector";

describe("user.selectors", () => {
  it("should get false with getUserIsLoading when state is empty", () => {
    Selector(getUserIsLoading)
      .expect(emptyState)
      .toReturn(false);
  });
});
