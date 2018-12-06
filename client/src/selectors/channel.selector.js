import { createSelector } from "reselect";

import { getUsername, getCurrentUser } from "./user.selector";

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
const getStateChannelList = state => state.channelReducer.channelList;

export const getCurrentChannel = state => state.channelReducer.currentChannel;

export const getCurrentChannelMemberList = state =>
  state.channelReducer.currentChannelMemberList;

export const getChannelIsLoading = state => state.channelReducer.isLoading;

/* derived data selectors */
export const getChannelList = createSelector(getStateChannelList, channelList =>
  channelList
    .filter(channel => channel.message_group === false)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
);

export const getMessageGroupList = createSelector(
  getStateChannelList,
  getUsername,
  (messageGroupList, username) =>
    messageGroupList
      .filter(channel => channel.message_group === true)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(messageGroup => {
        if (messageGroup.name) {
          // filter out current username from the group name
          const newMessageGroup = { ...messageGroup };
          newMessageGroup.name = filterOutCurrentUsername(
            messageGroup.name,
            username
          );

          // trim the extra char for name longer than 32 char
          if (newMessageGroup.name)
            newMessageGroup.name = trimExtraChar(newMessageGroup.name);

          // hide status bubble if the group is more than 2 people
          if (newMessageGroup.name)
            newMessageGroup.directMessage = isDirectMessage(
              newMessageGroup.name
            );

          if (newMessageGroup.name)
            newMessageGroup.memberNumber =
              (newMessageGroup.name.match(/,/g) || []).length + 1;

          return newMessageGroup;
        }
        return messageGroup;
      })
);

export const getMessageGroupName = createSelector(
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

export const getMessageGroupMemberList = createSelector(
  getCurrentChannelMemberList,
  getCurrentUser,
  (currentChannelMemberList, currentUser) =>
    currentChannelMemberList.filter(
      member => member.email !== currentUser.email
    )
);
