import React from "react";
import PropTypes from "prop-types";

class SidebarContainer extends React.Component {
  render() {
    const { toggleSideBar } = this.props;
    return (
      <React.Fragment>
        <div className="nav-section">
          <i
            className="fa fa-times fa-lg nav-section__toggle_button"
            onClick={toggleSideBar}
          />
          <span className="nav-section__my-profile">
            My Profile
            <i className="fa fa-cog" />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

SidebarContainer.propTypes = {};

export default SidebarContainer;
