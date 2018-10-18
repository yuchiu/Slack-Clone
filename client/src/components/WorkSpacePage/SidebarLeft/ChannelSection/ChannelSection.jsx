import React from "react";
import PropTypes from "prop-types";

import ChannelHeader from "./ChannelHeader.jsx";
import ChannelList from "./ChannelList";

const ChannelSection = ({
  currentTeam,
  channelList,

  switchChannel,
  switchRightSidebarView
}) => (
  <ul className="leftsidebar__List">
    <ChannelHeader currentTeam={currentTeam} />
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
  switchRightSidebarView: PropTypes.func.isRequired
};

export default ChannelSection;
