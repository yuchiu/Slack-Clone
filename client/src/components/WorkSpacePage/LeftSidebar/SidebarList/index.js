import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ChannelHeader from "./ChannelHeader";
import ChannelList from "./ChannelList";
import MessageGroupHeader from "./MessageGroupHeader";
import MessageGroupList from "./MessageGroupList";
import { channelAction, globalStateAction } from "@/actions";

import { teamSelector, channelSelector } from "@/reducers/selectors";

class SidebarList extends React.Component {
  render() {
    const {
      toggleAddMessageGroupModal,
      toggleAddChannelModal,

      currentTeam,
      messageGroupList,
      channelList,
      messageGroupMemberList,

      receiveSocketNewChannel,
      switchTargetUser,
      switchChannel,
      switchRightSidebarView
    } = this.props;
    return (
      <React.Fragment>
        <ul className="leftsidebar__List">
          <ChannelHeader
            isAdmin={currentTeam.admin}
            toggleAddChannelModal={toggleAddChannelModal}
          />
          <ChannelList
            switchChannel={switchChannel}
            switchRightSidebarView={switchRightSidebarView}
            teamId={currentTeam.id}
            channelList={channelList}
          />
        </ul>
        <ul className="leftsidebar__List">
          <MessageGroupHeader
            toggleAddMessageGroupModal={toggleAddMessageGroupModal}
          />
          <MessageGroupList
            teamId={currentTeam.id}
            messageGroupList={messageGroupList}
            switchTargetUser={switchTargetUser}
            switchChannel={switchChannel}
            messageGroupMemberList={messageGroupMemberList}
            switchRightSidebarView={switchRightSidebarView}
          />
        </ul>
      </React.Fragment>
    );
  }
}
SidebarList.propTypes = {
  toggleAddMessageGroupModal: PropTypes.func.isRequired,
  toggleAddChannelModal: PropTypes.func.isRequired,

  currentTeam: PropTypes.object.isRequired,
  messageGroupMemberList: PropTypes.array.isRequired,
  channelList: PropTypes.array.isRequired,
  messageGroupList: PropTypes.array.isRequired,

  switchTargetUser: PropTypes.func.isRequired,
  switchChannel: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

/* currentUser, channel, direct messages */
const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  messageGroupMemberList: channelSelector.getMessageGroupMemberList(state),
  channelList: channelSelector.getChannelList(state),
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
