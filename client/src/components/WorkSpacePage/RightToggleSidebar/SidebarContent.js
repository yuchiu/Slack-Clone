import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import { globalStateAction, channelAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector,
  userSelector
} from "@/reducers/selectors";
import {
  MyProfileView,
  ChannelDetailView,
  MemberListView,
  TeamDetailView,
  UserProfileView
} from "./contentView";

class SidebarContainer extends React.Component {
  toggleRightSidebar = () => {
    const { toggleRightSidebar } = this.props;
    toggleRightSidebar();
  };

  render() {
    const {
      /* states */
      currentChannel,
      messageGroupMemberList,
      currentChannelMemberList,
      currentTeam,
      rightSidebarView,
      currentTeamMemberList,
      currentUser,
      targetUser,
      messageGroupList,

      /* actions */
      fetchCreateChannel,
      switchChannel,
      switchTargetUser,
      switchRightSidebarView
    } = this.props;
    return (
      <div className="right-sidebar-content">
        {rightSidebarView === "my-profile" && (
          <MyProfileView currentUser={currentUser} />
        )}
        {rightSidebarView === "user-profile" && (
          <UserProfileView
            targetUser={targetUser}
            switchChannel={switchChannel}
            currentUser={currentUser}
            messageGroupList={messageGroupList}
            currentTeam={currentTeam}
            fetchCreateChannel={fetchCreateChannel}
          />
        )}

        {rightSidebarView === "channel" && (
          <ChannelDetailView
            currentChannel={currentChannel}
            currentChannelMemberList={currentChannelMemberList}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "team" && (
          <TeamDetailView
            currentTeam={currentTeam}
            currentTeamMemberList={currentTeamMemberList}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "message-group-members" && (
          <MemberListView
            memeberList={messageGroupMemberList}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "channel-members" && (
          <MemberListView
            memeberList={currentChannelMemberList}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "team-members" && (
          <MemberListView
            memeberList={currentTeamMemberList}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
      </div>
    );
  }
}

SidebarContainer.propTypes = {
  rightSidebarView: PropTypes.string.isRequired,
  targetUser: PropTypes.object,
  currentChannel: PropTypes.object.isRequired,
  messageGroupMemberList: PropTypes.array,
  currentChannelMemberList: PropTypes.array.isRequired,
  messageGroupList: PropTypes.array.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,

  switchRightSidebarView: PropTypes.func.isRequired,
  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  /* global state */
  rightSidebarView: globalStateSelector.getRightSidebarView(state),
  targetUser: globalStateSelector.getTargetUser(state),

  /* channel selector */
  currentChannel: channelSelector.getCurrentChannel(state),
  messageGroupMemberList: channelSelector.getMessageGroupMemberList(state),
  currentChannelMemberList: channelSelector.getCurrentChannelMemberList(state),
  messageGroupList: channelSelector.getMessageGroupList(state),

  /* team selector */
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state),

  /* user selector */
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  },
  switchTargetUser: targetUserId => {
    dispatch(globalStateAction.switchTargetUser(targetUserId));
  },
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  },
  fetchCreateChannel: channelFormInfo => {
    dispatch(channelAction.fetchCreateChannel(channelFormInfo));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SidebarContainer);
