import React from "react";
import PropTypes from "prop-types";

import { ButtonOutline } from "@/components/common";
import "./SidebarFooter.scss";

const SidebarFooter = ({ handleClick }) => (
  <div className="right-sidebar-footer">
    <ButtonOutline
      handleClick={handleClick}
      cssClass="right-sidebar-item"
      text="Log Out"
    />
  </div>
);

SidebarFooter.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default SidebarFooter;
