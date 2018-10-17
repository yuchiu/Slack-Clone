import React from "react";
import PropTypes from "prop-types";

import "./HeaderMain.scss";
import ChannelHeader from "./ChannelHeader.jsx";
import MessageGroupHeader from "./MessageGroupHeader.jsx";

class HeaderMain extends React.Component {
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
      currentChannelMemberList,
      currentChannel,
      messageGroupName,
      messageGroupMemberList
    } = this.props;
    return (
      <div className="main-header">
        {currentChannel.message_group && (
          <MessageGroupHeader
            messageGroupName={messageGroupName}
            currentChannelMemberList={currentChannelMemberList}
            messageGroupMemberList={messageGroupMemberList}
            switchToUserView={this.switchToUserView}
            switchToMemberListView={this.switchToMemberListView.bind(
              this,
              "message-group-members"
            )}
          />
        )}
        {!currentChannel.message_group && (
          <ChannelHeader
            currentChannel={currentChannel}
            currentChannelMemberList={currentChannelMemberList}
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

HeaderMain.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  currentChannelMemberList: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  messageGroupName: PropTypes.string,
  messageGroupMemberList: PropTypes.array.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default HeaderMain;
