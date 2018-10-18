import React from "react";
import PropTypes from "prop-types";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

import "./SidebarRightToggle.scss";

import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import SidebarContent from "./SidebarContent/SidebarContent";

const SidebarRightToggle = ({ children, isSidebarOpen }) => (
  <Sidebar.Pushable
    className="right-toggle-sidebar Sidebar-pushable"
    as={Segment}
  >
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      vertical
      visible={isSidebarOpen}
    >
      <div className="sidebar-wrapper">
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </div>
    </Sidebar>

    <Sidebar.Pusher className="Sidebar-pusher">
      <Segment className="Sidebar-segment" basic>
        {children}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

SidebarRightToggle.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

export default SidebarRightToggle;
