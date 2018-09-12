import constants from "@/constants";

const initialState = {
  channelList: [],
  currentChannel: {},
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channelList[0];
      newState.error = "";
      return newState;

    case constants.CREATE_CHANNEL:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      newState.error = "";
      return newState;

    case constants.GET_CHANNEL:
      newState.currentChannel = state.channelList.find(
        channel => channel.id === action.payload
      );
      newState.error = "";
      return newState;

    case constants.CHANNEL_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
