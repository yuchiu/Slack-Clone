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
  ViewMyProfile,
  ViewChannel,
  ViewMemberList,
  ViewTeam,
  ViewUser
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
      currentChannelMembers,
      currentTeam,
      rightSidebarView,
      currentTeamMembers,
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
          <ViewMyProfile currentUser={currentUser} />
        )}
        {rightSidebarView === "user-profile" && (
          <ViewUser
            targetUser={targetUser}
            switchChannel={switchChannel}
            currentUser={currentUser}
            messageGroupList={messageGroupList}
            currentTeam={currentTeam}
            fetchCreateChannel={fetchCreateChannel}
          />
        )}

        {rightSidebarView === "channel" && (
          <ViewChannel
            currentChannel={currentChannel}
            currentChannelMembers={currentChannelMembers}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "team" && (
          <ViewTeam
            currentTeam={currentTeam}
            currentTeamMembers={currentTeamMembers}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "message-group-members" && (
          <ViewMemberList
            memeberList={messageGroupMemberList}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "channel-members" && (
          <ViewMemberList
            memeberList={currentChannelMembers}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSidebarView={switchRightSidebarView}
          />
        )}
        {rightSidebarView === "team-members" && (
          <ViewMemberList
            memeberList={currentTeamMembers}
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
  currentChannelMembers: PropTypes.array.isRequired,
  messageGroupList: PropTypes.array.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentTeamMembers: PropTypes.array.isRequired,
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
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  messageGroupList: channelSelector.getMessageGroupList(state),

  /* team selector */
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),

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
