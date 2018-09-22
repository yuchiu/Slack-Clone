import { combineReducers } from "redux";
import { createSelector } from "reselect";

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

/* team selectors */
const getTeamList = state => state.teamReducer.teamList;
const getCurrentTeam = state => state.teamReducer.currentTeam;
const getCurrentTeamMembers = state => state.teamReducer.currentTeamMembers;

/* channel selectors */
const getAllChannelList = state => state.channelReducer.channelList;
const getChannelList = state =>
  state.channelReducer.channelList.filter(
    channel => channel.message_group === false
  );
const getMessageGroupList = state =>
  state.channelReducer.channelList.filter(
    channel => channel.message_group === true
  );
const getCurrentChannel = state => state.channelReducer.currentChannel;
const getCurrentChannelMembers = state =>
  state.channelReducer.currentChannelMembers;

/* message selectors */
const getMessageList = state => state.messageReducer.messageList;

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
  getChannelList,
  getMessageGroupList
};
