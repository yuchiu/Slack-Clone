import { combineReducers } from "redux";
import { createSelector } from "reselect";

import { filterOutCurrentUsername } from "@/utils";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import errorReducer from "./error.reducer";
import teamReducer from "./team.reducer";
import messageReducer from "./message.reducer";
import channelReducer from "./channel.reducer";

export default combineReducers({
  authReducer,
  teamReducer,
  channelReducer,
  messageReducer,
  errorReducer,
  userReducer
});

/* auth selectors */
const getIsUserLoggedIn = state => state.authReducer.isUserLoggedIn;

/* user selectors */
const getCurrentUser = state => state.userReducer.currentUser;

const getUsername = state => {
  const currentUser = getCurrentUser(state);
  return currentUser.username;
};

/* team selectors */

const getCurrentTeam = state => state.teamReducer.currentTeam;
const getCurrentTeamMembers = state => state.teamReducer.currentTeamMembers;
const getTeamList = state => {
  const teamList = state.teamReducer.teamList;
  return teamList.map(team => {
    const newTeam = { ...team };
    newTeam.initials = team.name
      .split(" ")
      .map(n => n[0])
      .join(".")
      .slice(0, 3);
    return newTeam;
  });
};

/* channel selectors */
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

/* message selectors */
const getMessageList = state =>
  state.messageReducer.messageList.map(message => {
    const newMessage = { ...message };
    if (newMessage.filetype) {
      if (newMessage.filetype.startsWith("image/")) {
        newMessage.filetype = "image";
      }
      if (message.filetype === "text/plain") {
        newMessage.filetype = "text";
      }
      if (message.filetype.startsWith("audio/")) {
        newMessage.filetype = "audio";
      }
    }
    return newMessage;
  });

/* error selectors */
const getError = state => state.errorReducer.error;

export {
  getIsUserLoggedIn,
  getCurrentUser,
  getMessageList,
  getError,
  getCurrentChannelMembers,
  getCurrentTeam,
  getCurrentChannel,
  getAllChannelList,
  getCurrentTeamMembers,
  getTeamList,
  getMessageGroupName,
  getUsername,
  getChannelList,
  getMessageGroupList
};
