import { getError } from "./error.selector";
import { getIsUserLoggedIn, getAuthIsLoading } from "./auth.selector";
import { getCurrentUser, getUsername, getUserIsLoading } from "./user.selector";
import {
  getTeamIsLoading,
  getCurrentTeam,
  getCurrentTeamMemberList,
  getTeamList
} from "./team.selector";
import {
  getMessageIsLoading,
  getMessageList,
  getHasMoreMessage
} from "./message.selector";
import {
  getChannelIsLoading,
  getCurrentChannel,
  getCurrentChannelMemberList,
  getChannelList,
  getMessageGroupMemberList,
  getMessageGroupList,
  getMessageGroupName
} from "./channel.selector";
import {
  getIsSidebarOpen,
  getRightSidebarView,
  getTargetUser,
  getRightSidebarTitle
} from "./globalState.selector";

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
  getUserIsLoading: state => getUserIsLoading(state),
  getUsername: state => getUsername(state)
};

export const teamSelector = {
  getCurrentTeam: state => getCurrentTeam(state),
  getTeamIsLoading: state => getTeamIsLoading(state),
  getCurrentTeamMemberList: state => getCurrentTeamMemberList(state),
  getTeamList: state => getTeamList(state)
};

export const channelSelector = {
  getChannelIsLoading: state => getChannelIsLoading(state),
  getCurrentChannel: state => getCurrentChannel(state),
  getCurrentChannelMemberList: state => getCurrentChannelMemberList(state),
  getChannelList: state => getChannelList(state),
  getMessageGroupList: state => getMessageGroupList(state),
  getMessageGroupName: state => getMessageGroupName(state),
  getMessageGroupMemberList: state => getMessageGroupMemberList(state)
};
export const messageSelector = {
  getMessageIsLoading: state => getMessageIsLoading(state),
  getMessageList: state => getMessageList(state),
  getHasMoreMessage: state => getHasMoreMessage(state)
};

export const errorSelector = {
  getError: state => getError(state)
};
