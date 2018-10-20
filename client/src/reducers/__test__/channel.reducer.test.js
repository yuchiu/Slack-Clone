import channelReducer from "../channel.reducer";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMemberList: [],
  isLoading: false
};

describe("channel.reducer initial state", () => {
  it("should have initial state", () => {
    expect(channelReducer(initialState, {})).toEqual(initialState);
  });
});
