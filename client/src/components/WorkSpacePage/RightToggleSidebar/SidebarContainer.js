import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarContent from "./SidebarContent";

class SidebarContainer extends React.Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </div>
    );
  }
}

SidebarContainer.propTypes = {};

export default SidebarContainer;
