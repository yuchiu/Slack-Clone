import userReducer from "@/reducers/user.reducer";

const initialState = {
  currentUser: {},
  isLoading: false
};

describe("user.reducer initial state", () => {
  it("should have initial state", () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });
});
