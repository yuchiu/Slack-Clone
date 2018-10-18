import React from "react";
import PropTypes from "prop-types";

import "./SidebarHeader.scss";

const SidebarHeader = ({ rightSidebarTitle, handleClick, handleToogle }) => (
  <React.Fragment>
    <div className="right-sidebar-header">
      <i
        className="fa fa-times fa-lg right-sidebar-header__toggle_button"
        onClick={handleToogle}
      />

      <div className="right-sidebar-header__title">{rightSidebarTitle}</div>
      <span className="right-sidebar-header__my-profile" onClick={handleClick}>
        My Profile
        <i className="fa fa-cog" />
      </span>
    </div>
  </React.Fragment>
);

SidebarHeader.propTypes = {
  rightSidebarTitle: PropTypes.string.isRequired,

  handleClick: PropTypes.func.isRequired,
  handleToogle: PropTypes.func.isRequired
};

export default SidebarHeader;
