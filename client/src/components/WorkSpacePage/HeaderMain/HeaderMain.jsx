import React from "react";
import PropTypes from "prop-types";

import "./HeaderMain.scss";
import ChannelHeader from "./ChannelHeader.jsx";
import MessageGroupHeader from "./MessageGroupHeader.jsx";

const HeaderMain = ({
  currentChannelMemberList,
  currentChannel,
  messageGroupName,
  messageGroupMemberList,

  switchToUserView,
  switchToMsgGroupMemberListView,
  switchToChannelMemberListView
}) => (
  <div className="main-header">
    {currentChannel.message_group && (
      <MessageGroupHeader
        messageGroupName={messageGroupName}
        currentChannelMemberList={currentChannelMemberList}
        messageGroupMemberList={messageGroupMemberList}
        switchToUserView={switchToUserView}
        switchToMemberListView={switchToMsgGroupMemberListView}
      />
    )}
    {!currentChannel.message_group && (
      <ChannelHeader
        currentChannel={currentChannel}
        currentChannelMemberList={currentChannelMemberList}
        switchToMemberListView={switchToChannelMemberListView}
      />
    )}
  </div>
);

HeaderMain.propTypes = {
  currentChannelMemberList: PropTypes.array.isRequired,
  currentChannel: PropTypes.object.isRequired,
  messageGroupName: PropTypes.string,
  messageGroupMemberList: PropTypes.array.isRequired,

  switchToUserView: PropTypes.func.isRequired,
  switchToMsgGroupMemberListView: PropTypes.func.isRequired,
  switchToChannelMemberListView: PropTypes.func.isRequired
};

export default HeaderMain;
