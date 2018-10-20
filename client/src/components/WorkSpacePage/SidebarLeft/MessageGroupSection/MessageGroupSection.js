import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction, globalStateAction } from "@/actions";
import { teamSelector, channelSelector } from "@/selectors/";
import MessageGroupSection from "./MessageGroupSection.jsx";

class SidebarList extends React.Component {
  render() {
    const {
      currentTeam,
      messageGroupList,
      messageGroupMemberList,

      switchTargetUser,
      switchChannel,
      switchRightSidebarView
    } = this.props;
    return (
      <MessageGroupSection
        currentTeam={currentTeam}
        messageGroupList={messageGroupList}
        messageGroupMemberList={messageGroupMemberList}
        switchTargetUser={switchTargetUser}
        switchChannel={switchChannel}
        switchRightSidebarView={switchRightSidebarView}
      />
    );
  }
}
SidebarList.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,
  messageGroupList: PropTypes.array.isRequired,

  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

/* currentUser, channel, direct messages */
const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  messageGroupMemberList: channelSelector.getMessageGroupMemberList(state),
  messageGroupList: channelSelector.getMessageGroupList(state)
});

const dispatchToProps = dispatch => ({
  switchTargetUser: targetUserId => {
    dispatch(globalStateAction.switchTargetUser(targetUserId));
  },
  switchChannel: channelId => {
    dispatch(channelAction.switchChannel(channelId));
  },
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SidebarList);
