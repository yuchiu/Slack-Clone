import { getIsUserLoggedIn } from "./auth.reducer";
import { getCurrentUser, getUsername } from "./user.reducer";
import {
  getCurrentTeam,
  getCurrentTeamMembers,
  getTeamList
} from "./team.reducer";
import {
  getCurrentChannel,
  getCurrentChannelMembers,
  getChannelList,
  getMessageGroupMemberList,
  getMessageGroupList,
  getMessageGroupName
} from "./channel.reducer";
import { getMessageList, getHasMoreMessage } from "./message.reducer";
import { getError } from "./error.reducer";
import {
  getIsSidebarOpen,
  getIsEditModalOpen,
  getRightSidebarView,
  getTargetUser,
  getRightSidebarTitle
} from "./globalState.reducer";

const globalStateSelector = {
  getIsSidebarOpen: state => getIsSidebarOpen(state),
  getRightSidebarView: state => getRightSidebarView(state),
  getRightSidebarTitle: state => getRightSidebarTitle(state),
  getTargetUser: state => getTargetUser(state),
  getIsEditModalOpen: state => getIsEditModalOpen(state)
};

const authSelector = {
  getIsUserLoggedIn: state => getIsUserLoggedIn(state)
};

const userSelector = {
  getCurrentUser: state => getCurrentUser(state),
  getUsername: state => getUsername(state)
};

const teamSelector = {
  getCurrentTeam: state => getCurrentTeam(state),
  getCurrentTeamMembers: state => getCurrentTeamMembers(state),
  getTeamList: state => getTeamList(state)
};

const channelSelector = {
  getCurrentChannel: state => getCurrentChannel(state),
  getCurrentChannelMembers: state => getCurrentChannelMembers(state),
  getChannelList: state => getChannelList(state),
  getMessageGroupList: state => getMessageGroupList(state),
  getMessageGroupName: state => getMessageGroupName(state),
  getMessageGroupMemberList: state => getMessageGroupMemberList(state)
};
const messageSelector = {
  getMessageList: state => getMessageList(state),
  getHasMoreMessage: state => getHasMoreMessage(state)
};

const errorSelector = {
  getError: state => getError(state)
};

export {
  authSelector,
  userSelector,
  teamSelector,
  channelSelector,
  messageSelector,
  errorSelector,
  globalStateSelector
};
