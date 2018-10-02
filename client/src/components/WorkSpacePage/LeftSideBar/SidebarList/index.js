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
      targetMemberList,

      switchTargetUser,
      switchChannel,
      switchRightSideBarView
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
            switchRightSideBarView={switchRightSideBarView}
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
            targetMemberList={targetMemberList}
            switchRightSideBarView={switchRightSideBarView}
          />
        </ul>
      </React.Fragment>
    );
  }
}
SidebarList.propTypes = {};

/* currentUser, channel, direct messages */
const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  targetMemberList: channelSelector.getTargetMemberList(state),
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
  switchRightSideBarView: selectedView => {
    dispatch(globalStateAction.switchRightSideBarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SidebarList);
