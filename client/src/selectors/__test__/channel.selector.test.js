import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { getChannelIsLoading } from "@/selectors/channel.selector";

describe("channel.selectors", () => {
  it("should get false with getChannelIsLoading when state is empty", () => {
    Selector(getChannelIsLoading)
      .expect(emptyState)
      .toReturn(false);
  });
});
