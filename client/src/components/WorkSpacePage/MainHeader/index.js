import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import MessageGroupHeader from "./MessageGroupHeader";
import { globalStateAction } from "@/actions";
import { channelSelector, globalStateSelector } from "@/reducers/selectors";

class MainHeader extends React.Component {
  switchToMemberListView = selectedView => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView(selectedView);
  };

  switchToUserView = () => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView("user-profile");
  };

  render() {
    const {
      currentChannelMembers,
      currentChannel,
      messageGroupName,
      messageGroupMemberList
    } = this.props;
    return (
      <div className="main-header">
        {currentChannel.message_group && (
          <MessageGroupHeader
            messageGroupName={messageGroupName}
            currentChannelMembers={currentChannelMembers}
            switchToUserView={this.switchToUserView}
            messageGroupMemberList={messageGroupMemberList}
            switchToMemberListView={this.switchToMemberListView.bind(
              this,
              "message-group-members"
            )}
          />
        )}
        {!currentChannel.message_group && (
          <ChannelHeader
            currentChannel={currentChannel}
            currentChannelMembers={currentChannelMembers}
            switchToMemberListView={this.switchToMemberListView.bind(
              this,
              "channel-members"
            )}
          />
        )}
      </div>
    );
  }
}

MainHeader.propTypes = {
  currentChannelMembers: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  messageGroupName: PropTypes.string,
  messageGroupMemberList: PropTypes.array.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state),
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  currentChannel: channelSelector.getCurrentChannel(state),
  messageGroupName: channelSelector.getMessageGroupName(state),
  messageGroupMemberList: channelSelector.getMessageGroupMemberList(state)
});

const dispatchToProps = dispatch => ({
  toggleRightSidebar: () => {
    dispatch(globalStateAction.toggleRightSidebar());
  },
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
