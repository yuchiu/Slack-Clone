import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import MessageGroupHeader from "./MessageGroupHeader";
import { channelSelector } from "@/reducers/selectors";

class MainHeader extends React.Component {
  componentDidMount() {}

  render() {
    const {
      currentChannelMembers,
      currentChannel,
      messageGroupName
    } = this.props;
    return (
      <div className="main-header">
        {currentChannel.message_group && (
          <MessageGroupHeader
            messageGroupName={messageGroupName}
            currentChannelMembers={currentChannelMembers}
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
  messageGroupName: channelSelector.getMessageGroupName(state)
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
