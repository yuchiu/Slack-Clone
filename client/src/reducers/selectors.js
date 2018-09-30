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
  getStateChannelList,
  getChannelList,
  getTargetMemberList,
  getMessageGroupList,
  getMessageGroupName
} from "./channel.reducer";
import { getMessageList } from "./message.reducer";
import { getError } from "./error.reducer";
import { getIsSideBarOpen, getRightSideBarView } from "./globalState.reducer";

const globalStateSelector = {
  getIsSideBarOpen: state => getIsSideBarOpen(state),
  getRightSideBarView: state => getRightSideBarView(state)
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
  getStateChannelList: state => getStateChannelList(state),
  getChannelList: state => getChannelList(state),
  getMessageGroupList: state => getMessageGroupList(state),
  getMessageGroupName: state => getMessageGroupName(state),
  getTargetMemberList: state => getTargetMemberList(state)
};
const messageSelector = {
  getMessageList: state => getMessageList(state)
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
