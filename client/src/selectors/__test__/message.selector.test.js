import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getMessageIsLoading } from "@/selectors/message.selector";

describe("message.selectors", () => {
  it("should get false with getMessageIsLoading when state is empty", () => {
    Selector(getMessageIsLoading)
      .expect(emptyState)
      .toReturn(false);
  });
});
