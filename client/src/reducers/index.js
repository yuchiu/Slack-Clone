import { combineReducers } from "redux";

import authReducer, {
  getIsUserLoggedIn,
  getAuthIsLoading
} from "./auth.reducer";
import userReducer, { getCurrentUser, getUsername } from "./user.reducer";
import errorReducer, { getError } from "./error.reducer";
import teamReducer, {
  getCurrentTeam,
  getCurrentTeamMemberList,
  getTeamList
} from "./team.reducer";
import messageReducer, {
  getMessageList,
  getHasMoreMessage
} from "./message.reducer";
import channelReducer, {
  getCurrentChannel,
  getCurrentChannelMemberList,
  getChannelList,
  getMessageGroupMemberList,
  getMessageGroupList,
  getMessageGroupName
} from "./channel.reducer";
import globalStateReducer, {
  getIsSidebarOpen,
  getRightSidebarView,
  getTargetUser,
  getRightSidebarTitle
} from "./globalState.reducer";

export default combineReducers({
  authReducer,
  teamReducer,
  channelReducer,
  messageReducer,
  errorReducer,
  globalStateReducer,
  userReducer
});

export const globalStateSelector = {
  getIsSidebarOpen: state => getIsSidebarOpen(state),
  getRightSidebarView: state => getRightSidebarView(state),
  getRightSidebarTitle: state => getRightSidebarTitle(state),
  getTargetUser: state => getTargetUser(state)
};

export const authSelector = {
  getAuthIsLoading: state => getAuthIsLoading(state),
  getIsUserLoggedIn: state => getIsUserLoggedIn(state)
};

export const userSelector = {
  getCurrentUser: state => getCurrentUser(state),
  getUsername: state => getUsername(state)
};

export const teamSelector = {
  getCurrentTeam: state => getCurrentTeam(state),
  getCurrentTeamMemberList: state => getCurrentTeamMemberList(state),
  getTeamList: state => getTeamList(state)
};

export const channelSelector = {
  getCurrentChannel: state => getCurrentChannel(state),
  getCurrentChannelMemberList: state => getCurrentChannelMemberList(state),
  getChannelList: state => getChannelList(state),
  getMessageGroupList: state => getMessageGroupList(state),
  getMessageGroupName: state => getMessageGroupName(state),
  getMessageGroupMemberList: state => getMessageGroupMemberList(state)
};
export const messageSelector = {
  getMessageList: state => getMessageList(state),
  getHasMoreMessage: state => getHasMoreMessage(state)
};

export const errorSelector = {
  getError: state => getError(state)
};
