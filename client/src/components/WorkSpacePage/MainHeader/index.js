import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import MessageGroupHeader from "./MessageGroupHeader";
import { channelSelector } from "@/reducers/selectors";

class MainHeader extends React.Component {
  render() {
    const {
      currentChannelMembers,
      currentChannel,
      messageGroupName,
      targetMemberList
    } = this.props;
    return (
      <div className="main-header">
        {currentChannel.message_group && (
          <MessageGroupHeader
            messageGroupName={messageGroupName}
            currentChannelMembers={currentChannelMembers}
            targetMemberList={targetMemberList}
          />
        )}
        {!currentChannel.message_group && (
          <ChannelHeader
            currentChannel={currentChannel}
            currentChannelMembers={currentChannelMembers}
          />
        )}
      </div>
    );
  }
}

MainHeader.propTypes = {};

const stateToProps = state => ({
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  currentChannel: channelSelector.getCurrentChannel(state),
  messageGroupName: channelSelector.getMessageGroupName(state),
  targetMemberList: channelSelector.getTargetMemberList(state)
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
