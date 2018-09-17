import constants from "@/constants";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMembers: [],
  messageGroupList: [],
  error: ""
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

const getChannelList = list =>
  list.filter(channel => channel.messageGroup === false);

const getGetMessageGroupList = list =>
  list.filter(channel => channel.messageGroup === true);

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.channelList = getChannelList(action.payload.channelList);
      newState.messageGroupList = getGetMessageGroupList(
        action.payload.channelList
      );
      newState.currentChannel = action.payload.channelList[0];

      newState.error = "";
      return newState;

    case constants.CREATE_CHANNEL:
      newState.channelList = getChannelList(action.payload.channelList);
      newState.messageGroupList = getGetMessageGroupList(
        action.payload.channelList
      );
      newState.currentChannel = action.payload.channel;
      newState.currentChannelMembers = action.payload.channelMemberList;
      newState.error = "";
      return newState;

    case constants.SWITCH_CHANNEL:
      newState.currentChannel = state.channelList
        .concat(state.messageGroupList)
        .find(channel => channel.id === action.payload);
      newState.error = "";
      return newState;

    case constants.GET_CURRENT_CHANNEL:
      newState.currentChannel = getCurrentChannelFromParams(
        state.channelList.concat(state.messageGroupList),
        state.currentChannel,
        action.payload.channelId
      );
      newState.error = "";
      return newState;

    case constants.GET_CHANNEL_ASSOCIATED_LIST:
      newState.currentChannelMembers = action.payload.channelMemberList;
      newState.error = "";
      return newState;
    case constants.CHANNEL_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
