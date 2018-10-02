import { createSelector } from "reselect";

import constants from "@/constants";
import { getUsername, getCurrentUser } from "./user.reducer";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMembers: []
};

/* helper functions */
const getCurrentChannelFromParams = (
  channelList,
  currentChannel,
  channelIdFromParams
) => {
  if (!channelIdFromParams) {
    return currentChannel;
  }
  // return current channel using params
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

    case constants.LOGOUT_USER:
      return initialState;

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

/* state selectors */
const getCurrentChannel = state => state.channelReducer.currentChannel;

const getCurrentChannelMembers = state =>
  state.channelReducer.currentChannelMembers;

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
        if (messageGroup.name.length) {
          // filter out current username from the group name
          const newMessageGroup = { ...messageGroup };
          newMessageGroup.name = filterOutCurrentUsername(
            messageGroup.name,
            username
          );

          // trim the extra char for long name
          if (newMessageGroup.name.length > 32) {
            newMessageGroup.name = newMessageGroup.name
              .slice(0, 31)
              .concat("...");
          }

          // hide status bubble if the group is more than 2 people
          newMessageGroup.directMessage = false;
          if ((newMessageGroup.name.match(/,/g) || []).length === 0) {
            newMessageGroup.directMessage = true;
          }
          const memberNumber = (newMessageGroup.name.match(/,/g) || []).length;

          newMessageGroup.memberNumber = memberNumber + 1;

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
  getCurrentChannelMembers,
  getCurrentUser,
  (currentChannelMembers, currentUser) =>
    currentChannelMembers.filter(member => member.email !== currentUser.email)
);

export {
  getCurrentChannel,
  getCurrentChannelMembers,
  getMessageGroupMemberList,
  getChannelList,
  getMessageGroupList,
  getMessageGroupName
};
