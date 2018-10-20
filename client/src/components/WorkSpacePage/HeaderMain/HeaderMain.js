import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { globalStateAction } from "@/actions";
import { channelSelector, globalStateSelector } from "@/selectors/";
import HeaderMain from "./HeaderMain.jsx";

class HeaderMainContainer extends React.Component {
  switchToMsgGroupMemberListView = () => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView("message-group-members");
  };

  switchToChannelMemberListView = () => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView("channel-members");
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
      <HeaderMain
        currentChannelMemberList={currentChannelMemberList}
        currentChannel={currentChannel}
        messageGroupName={messageGroupName}
        messageGroupMemberList={messageGroupMemberList}
        switchToUserView={this.switchToUserView}
        switchToMsgGroupMemberListView={this.switchToMsgGroupMemberListView}
        switchToChannelMemberListView={this.switchToChannelMemberListView}
      />
    );
  }
}

HeaderMainContainer.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  currentChannelMemberList: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  messageGroupName: PropTypes.string,
  messageGroupMemberList: PropTypes.array.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};
const stateToProps = state => ({
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state),
  currentChannelMemberList: channelSelector.getCurrentChannelMemberList(state),
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
  )(HeaderMainContainer)
);
