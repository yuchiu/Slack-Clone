import constants from "@/constants";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMembers: []
};

const getCurrentChannelFromParams = (
  channelList,
  currentChannel,
  channelIdFromParams
) => {
  if (!channelIdFromParams) {
    return currentChannel;
  }
  /* return current channel using params */
  const currentChannelFromParams = channelList.find(
    channel => channel.id === parseInt(channelIdFromParams, 10)
  );
  return currentChannelFromParams;
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channelList[0];

      return newState;

    case constants.CREATE_CHANNEL:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      newState.currentChannelMembers = action.payload.channelMemberList;

      return newState;

    case constants.SWITCH_CHANNEL:
      newState.currentChannel = state.channelList.find(
        channel => channel.id === action.payload
      );
      return newState;

    case constants.GET_CURRENT_CHANNEL:
      newState.currentChannel = getCurrentChannelFromParams(
        state.channelList,
        state.currentChannel,
        action.payload.channelId
      );
      return newState;

    case constants.GET_CHANNEL_ASSOCIATED_LIST:
      newState.currentChannelMembers = action.payload.channelMemberList;
      return newState;

    default:
      return state;
  }
};
