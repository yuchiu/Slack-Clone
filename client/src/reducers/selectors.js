import { getIsUserLoggedIn } from "./auth.reducer";
import { getCurrentUser, getUsername } from "./user.reducer";
import {
  getCurrentTeam,
  getCurrentTeamMemberList,
  getTeamList
} from "./team.reducer";
import {
  getCurrentChannel,
  getCurrentChannelMemberList,
  getChannelList,
  getMessageGroupMemberList,
  getMessageGroupList,
  getMessageGroupName
} from "./channel.reducer";
import { getMessageList, getHasMoreMessage } from "./message.reducer";
import { getError } from "./error.reducer";
import {
  getIsSidebarOpen,
  getRightSidebarView,
  getTargetUser,
  getRightSidebarTitle
} from "./globalState.reducer";

const globalStateSelector = {
  getIsSidebarOpen: state => getIsSidebarOpen(state),
  getRightSidebarView: state => getRightSidebarView(state),
  getRightSidebarTitle: state => getRightSidebarTitle(state),
  getTargetUser: state => getTargetUser(state)
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
  getCurrentTeamMemberList: state => getCurrentTeamMemberList(state),
  getTeamList: state => getTeamList(state)
};

const channelSelector = {
  getCurrentChannel: state => getCurrentChannel(state),
  getCurrentChannelMemberList: state => getCurrentChannelMemberList(state),
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
