import Immutable from "seamless-immutable";

export default Immutable({
  authReducer: {
    isUserLoggedIn: false,
    isLoading: false
  },
  channelReducer: {
    channelList: [],
    currentChannel: {},
    currentChannelMemberList: [],
    isLoading: false
  },
  errorReducer: {
    error: ""
  },
  globalStateReducer: {
    isSidebarOpen: false,
    rightSidebarView: "team",
    targetUserId: null
  },
  messageReducer: {
    messageList: [],
    hasMoreMessage: true,
    isLoading: false
  },
  teamReducer: {
    teamList: [],
    currentTeam: {},
    currentTeamMemberList: [],
    isLoading: false
  },
  userReducer: {
    currentUser: {},
    isLoading: false
  }
});
