import messageReducer from "@/reducers/message.reducer";

const initialState = {
  messageList: [],
  hasMoreMessage: true,
  isLoading: false
};

describe("message.reducer initial state", () => {
  it("should have initial state", () => {
    expect(messageReducer(initialState, {})).toEqual(initialState);
  });
});
