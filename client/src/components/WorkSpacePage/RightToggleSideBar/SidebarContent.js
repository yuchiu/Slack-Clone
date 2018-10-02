import React from "react";
import { withRouter } from "react-router-dom";
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
} from "./sidebarContent";

class SidebarContainer extends React.Component {
  toggleSideBar = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

  render() {
    const {
      /* states */
      currentChannel,
      targetMemberList,
      currentChannelMembers,
      currentTeam,
      rightSideBarView,
      currentTeamMembers,
      currentUser,
      targetUser,
      messageGroupList,

      /* actions */
      createChannel,
      switchChannel,
      switchTargetUser,
      switchRightSideBarView
    } = this.props;
    return (
      <div className="right-side-bar-content">
        {rightSideBarView === "my-profile" && (
          <ViewMyProfile currentUser={currentUser} />
        )}
        {rightSideBarView === "user-profile" && (
          <ViewUser
            targetUser={targetUser}
            switchChannel={switchChannel}
            currentUser={currentUser}
            messageGroupList={messageGroupList}
            currentTeam={currentTeam}
            createChannel={createChannel}
          />
        )}

        {rightSideBarView === "channel" && (
          <ViewChannel
            currentChannel={currentChannel}
            currentChannelMembers={currentChannelMembers}
            switchRightSideBarView={switchRightSideBarView}
          />
        )}
        {rightSideBarView === "team" && (
          <ViewTeam
            currentTeam={currentTeam}
            currentTeamMembers={currentTeamMembers}
            switchRightSideBarView={switchRightSideBarView}
          />
        )}
        {rightSideBarView === "message-group-members" && (
          <ViewMemberList
            memeberList={targetMemberList}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSideBarView={switchRightSideBarView}
          />
        )}
        {rightSideBarView === "channel-members" && (
          <ViewMemberList
            memeberList={currentChannelMembers}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSideBarView={switchRightSideBarView}
          />
        )}
        {rightSideBarView === "team-members" && (
          <ViewMemberList
            memeberList={currentTeamMembers}
            switchTargetUser={switchTargetUser}
            currentUser={currentUser}
            switchRightSideBarView={switchRightSideBarView}
          />
        )}
      </div>
    );
  }
}

SidebarContainer.propTypes = {};

const stateToProps = state => ({
  /* global state */
  rightSideBarView: globalStateSelector.getRightSideBarView(state),
  targetUser: globalStateSelector.getTargetUser(state),

  /* channel selector */
  currentChannel: channelSelector.getCurrentChannel(state),
  targetMemberList: channelSelector.getTargetMemberList(state),
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  messageGroupList: channelSelector.getMessageGroupList(state),

  /* team selector */
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),

  /* user selector */
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  switchRightSideBarView: selectedView => {
    dispatch(globalStateAction.switchRightSideBarView(selectedView));
  },
  switchTargetUser: targetUserId => {
    dispatch(globalStateAction.switchTargetUser(targetUserId));
  },
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  },
  createChannel: channelFormInfo => {
    dispatch(channelAction.createChannel(channelFormInfo));
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(SidebarContainer)
);
