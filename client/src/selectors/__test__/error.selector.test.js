import { Selector } from "redux-testkit";

import { errorSelector } from "@/selectors";

const state = {
  errorReducer: {
    error: "server error"
  }
};
describe("error.selectors", () => {
  it("should get false with getError when state is empty", () => {
    const result = "server error";

    Selector(errorSelector.getError)
      .expect(state)
      .toReturn(result);
  });
});
