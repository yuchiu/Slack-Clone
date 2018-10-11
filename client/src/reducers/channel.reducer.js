import { createSelector } from "reselect";

import constants from "@/constants";
import { getUsername, getCurrentUser } from "./user.reducer";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMemberList: []
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.TEAM_FETCH_ASSOCIATED_LIST:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channelList[0];

      return newState;

    case constants.CHANNEL_FETCH_CREATE:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      newState.currentChannelMemberList = action.payload.channelMemberList;

      return newState;

    case constants.CHANNEL_FETCH_EDIT:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;

      return newState;

    case constants.CHANNEL_SWITCH:
      newState.currentChannel = state.channelList.find(
        channel => channel.id === action.payload
      );
      return newState;

    case constants.CHANNEL_FETCH_ASSOCIATED_LIST:
      newState.currentChannelMemberList = action.payload.channelMemberList;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
/* helper functions */

const trimExtraChar = data => {
  if (data.length > 32) {
    data.slice(0, 28).concat("...");
    return data;
  }
  return data;
};

const isDirectMessage = data => {
  if ((data.match(/,/g) || []).length === 0) {
    return true;
  }
  return false;
};

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

/* state selectors */
const getCurrentChannel = state => state.channelReducer.currentChannel;

const getCurrentChannelMemberList = state =>
  state.channelReducer.currentChannelMemberList;

const getStateChannelList = state => state.channelReducer.channelList;

/* derived data selectors */
const getChannelList = createSelector(getStateChannelList, channelList =>
  channelList.filter(channel => channel.message_group === false)
);

const getMessageGroupList = createSelector(
  getStateChannelList,
  getUsername,
  (messageGroupList, username) =>
    messageGroupList
      .filter(channel => channel.message_group === true)
      .map(messageGroup => {
        if (messageGroup.name) {
          // filter out current username from the group name
          const newMessageGroup = { ...messageGroup };
          newMessageGroup.name = filterOutCurrentUsername(
            messageGroup.name,
            username
          );

          // trim the extra char for name longer than 32 char
          newMessageGroup.name = trimExtraChar(newMessageGroup.name);

          // hide status bubble if the group is more than 2 people
          newMessageGroup.directMessage = isDirectMessage(newMessageGroup.name);

          newMessageGroup.memberNumber =
            (newMessageGroup.name.match(/,/g) || []).length + 1;

          return newMessageGroup;
        }
        return messageGroup;
      })
);

const getMessageGroupName = createSelector(
  getMessageGroupList,
  getCurrentChannel,
  (messageGroupList, currentChannel) => {
    const filteredMessageGroupName = messageGroupList
      .filter(channel => channel.id === currentChannel.id)
      .map(channel => channel.name);
    const messageGroupName = filteredMessageGroupName[0];
    return messageGroupName;
  }
);

const getMessageGroupMemberList = createSelector(
  getCurrentChannelMemberList,
  getCurrentUser,
  (currentChannelMemberList, currentUser) =>
    currentChannelMemberList.filter(
      member => member.email !== currentUser.email
    )
);

export {
  getCurrentChannel,
  getCurrentChannelMemberList,
  getMessageGroupMemberList,
  getChannelList,
  getMessageGroupList,
  getMessageGroupName
};
