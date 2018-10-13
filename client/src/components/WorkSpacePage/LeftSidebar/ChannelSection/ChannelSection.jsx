import React from "react";
import PropTypes from "prop-types";

import ChannelHeader from "./ChannelHeader.jsx";
import ChannelList from "./ChannelList.jsx";

const ChannelSection = ({
  currentTeam,
  channelList,

  switchChannel,
  toggleAddChannelModal,
  switchRightSidebarView
}) => (
  <ul className="leftsidebar__List">
    <ChannelHeader
      currentTeam={currentTeam}
      toggleAddChannelModal={toggleAddChannelModal}
    />
    <ChannelList
      switchChannel={switchChannel}
      switchRightSidebarView={switchRightSidebarView}
      currentTeam={currentTeam}
      channelList={channelList}
    />
  </ul>
);

ChannelSection.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  channelList: PropTypes.array.isRequired,

  switchChannel: PropTypes.func.isRequired,
  toggleAddChannelModal: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

export default ChannelSection;
