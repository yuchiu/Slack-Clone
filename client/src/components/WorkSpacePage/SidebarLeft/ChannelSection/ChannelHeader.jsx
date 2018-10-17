import React from "react";
import PropTypes from "prop-types";

import { ModalAddChannel } from "@/components/WorkSpacePage/SidebarLeft/modals";

const ChannelHeader = ({ currentTeam }) => (
  <React.Fragment>
    <h1 className="leftsidebar__List__header">
      <span className="leftsidebar__List__header__title">Channels</span>
      <ModalAddChannel />
    </h1>
  </React.Fragment>
);

ChannelHeader.propTypes = {
  currentTeam: PropTypes.object.isRequired
};

export default ChannelHeader;
