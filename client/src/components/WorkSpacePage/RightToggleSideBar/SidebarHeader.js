import React from "react";
import PropTypes from "prop-types";

class SidebarContainer extends React.Component {
  render() {
    const {
      toggleSideBar,
      rightSideBarTitle,
      switchViewToMyProfile
    } = this.props;
    return (
      <React.Fragment>
        <div className="right-side-bar-header">
          <i
            className="fa fa-times fa-lg right-side-bar-header__toggle_button"
            onClick={toggleSideBar}
          />

          <div className="right-side-bar-header__title">
            {rightSideBarTitle}
          </div>
          <span
            className="right-side-bar-header__my-profile"
            onClick={switchViewToMyProfile}
          >
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
