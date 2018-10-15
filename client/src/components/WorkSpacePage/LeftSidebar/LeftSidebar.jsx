import React from "react";
import PropTypes from "prop-types";

import "./LeftSidebar.scss";
import ChannelSection from "./ChannelSection/ChannelSection";
import MessageGroupSection from "./MessageGroupSection/MessageGroupSection";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import { ModalAddTeamMember } from "./modals";

const LeftSidebar = () => (
  <React.Fragment>
    <section className="leftsidebar">
      <SidebarHeader />
      <ChannelSection />
      <MessageGroupSection />
      <ModalAddTeamMember />
    </section>
  </React.Fragment>
);

export default LeftSidebar;
