import React from "react";
import PropTypes from "prop-types";

import ChannelHeader from "./ChannelHeader.jsx";
import ChannelList from "./ChannelList.jsx";

const ChannelSection = ({
  isAdmin,
  teamId,
  channelList,

  switchChannel,
  toggleAddChannelModal,
  switchRightSidebarView
}) => (
  <ul className="leftsidebar__List">
    <ChannelHeader
      isAdmin={isAdmin}
      toggleAddChannelModal={toggleAddChannelModal}
    />
    <ChannelList
      switchChannel={switchChannel}
      switchRightSidebarView={switchRightSidebarView}
      teamId={teamId}
      channelList={channelList}
    />
  </ul>
);

ChannelSection.propTypes = {
  teamId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  channelList: PropTypes.array.isRequired,

  switchChannel: PropTypes.func.isRequired,
  toggleAddChannelModal: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default ChannelSection;
