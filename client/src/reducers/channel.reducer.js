import constants from "@/constants";
import { getUsername } from "./user.reducer";

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
/* helper functions */
const filterOutCurrentUsername = (messageGroupName, currentUsername) => {
  const position = messageGroupName.indexOf(currentUsername);

  if (!currentUsername || !messageGroupName) {
    return null;
  }
  // if current username at the begining
  if (position === 0)
    return messageGroupName.substring(
      position + currentUsername.length + 2,
      messageGroupName.length
    );

  // if current username at the end
  if (position + currentUsername.length === messageGroupName.length) {
    return messageGroupName
      .substring(0, position - 2)
      .concat(
        messageGroupName.substring(
          position + currentUsername.length,
          messageGroupName.length
        )
      );
  }

  // if current username at the middle
  return messageGroupName
    .substring(0, position - 2)
    .concat(
      messageGroupName.substring(
        position + currentUsername.length,
        messageGroupName.length
      )
    );
};

/* selectors */
const getCurrentChannel = state => state.channelReducer.currentChannel;

const getCurrentChannelMembers = state =>
  state.channelReducer.currentChannelMembers;

const getAllChannelList = state => state.channelReducer.channelList;

const getChannelList = state =>
  state.channelReducer.channelList.filter(
    channel => channel.message_group === false
  );

const getMessageGroupList = state =>
  state.channelReducer.channelList
    .filter(channel => channel.message_group === true)
    .map(messageGroup => {
      const username = getUsername(state);
      const newMessageGroup = { ...messageGroup };
      newMessageGroup.name = filterOutCurrentUsername(
        messageGroup.name,
        username
      );
      return newMessageGroup;
    });

const getMessageGroupName = state => {
  const currentChannel = getCurrentChannel(state);
  const messageGroupList = getMessageGroupList(state);
  const filteredMessageGroupName = messageGroupList
    .filter(channel => channel.id === currentChannel.id)
    .map(channel => channel.name);
  const messageGroupName = filteredMessageGroupName[0];
  return messageGroupName;
};

export {
  getCurrentChannel,
  getCurrentChannelMembers,
  getAllChannelList,
  getChannelList,
  getMessageGroupList,
  getMessageGroupName
};
