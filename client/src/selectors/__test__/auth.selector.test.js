import { Selector } from "redux-testkit";

import { authSelector } from "@/selectors";

const state = {
  authReducer: {
    isUserLoggedIn: false,
    isLoading: false
  }
};
describe("auth.selectors", () => {
  it("should getIsUserLoggedIn", () => {
    const result = false;
    Selector(authSelector.getIsUserLoggedIn)
      .expect(state)
      .toReturn(result);
  });
  it("should getAuthIsLoading", () => {
    const result = false;
    Selector(authSelector.getAuthIsLoading)
      .expect(state)
      .toReturn(result);
  });
});
