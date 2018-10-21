import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getError } from "@/selectors/error.selector";

describe("error.selectors", () => {
  it("should get false with getError when state is empty", () => {
    Selector(getError)
      .expect(emptyState)
      .toReturn("");
  });
});
