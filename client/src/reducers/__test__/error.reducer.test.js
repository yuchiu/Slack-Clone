import errorReducer from "@/reducers/error.reducer";

const initialState = {
  error: ""
};

describe("error.reducer initial state", () => {
  it("should have initial state", () => {
    expect(errorReducer(initialState, {})).toEqual(initialState);
  });
});
