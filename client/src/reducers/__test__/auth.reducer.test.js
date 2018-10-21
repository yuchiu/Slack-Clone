import authReducer from "@/reducers/auth.reducer";

const initialState = {
  isUserLoggedIn: false,
  isLoading: false
};

describe("auth.reducer initial state", () => {
  it("should have initial state", () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });
});
