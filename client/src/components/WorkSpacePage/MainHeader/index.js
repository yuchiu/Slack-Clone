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
  handleSwitchRightSideBarView = selectedView => {
    const { toggleSideBar, switchRightSideBarView, isSideBarOpen } = this.props;
    if (!isSideBarOpen) {
      toggleSideBar();
    }
    switchRightSideBarView(selectedView);
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
            messageGroupMemberList={messageGroupMemberList}
            handleSwitchRightSideBarView={this.handleSwitchRightSideBarView.bind(
              this,
              "message-group-members"
            )}
          />
        )}
        {!currentChannel.message_group && (
          <ChannelHeader
            currentChannel={currentChannel}
            currentChannelMembers={currentChannelMembers}
            handleSwitchRightSideBarView={this.handleSwitchRightSideBarView.bind(
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
  isSideBarOpen: PropTypes.bool.isRequired,
  currentChannelMembers: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  messageGroupName: PropTypes.string,
  messageGroupMemberList: PropTypes.array.isRequired,

  toggleSideBar: PropTypes.func.isRequired,
  switchRightSideBarView: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isSideBarOpen: globalStateSelector.getIsSideBarOpen(state),
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  currentChannel: channelSelector.getCurrentChannel(state),
  messageGroupName: channelSelector.getMessageGroupName(state),
  messageGroupMemberList: channelSelector.getMessageGroupMemberList(state)
});

const dispatchToProps = dispatch => ({
  toggleSideBar: () => {
    dispatch(globalStateAction.toggleSideBar());
  },
  switchRightSideBarView: selectedView => {
    dispatch(globalStateAction.switchRightSideBarView(selectedView));
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
