import React from "react";
import PropTypes from "prop-types";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

import "./RightToggleSidebar.scss";

import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import SidebarContent from "./SidebarContent/SidebarContent";

class RightToggleSidebar extends React.Component {
  render() {
    const { children, isSidebarOpen } = this.props;
    return (
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
  }
}

RightToggleSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired
};

export default RightToggleSidebar;
