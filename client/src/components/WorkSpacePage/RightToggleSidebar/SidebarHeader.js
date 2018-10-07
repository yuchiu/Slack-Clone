import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";

class SidebarHeader extends React.PureComponent {
  handleClick = () => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView("my-profile");
  };

  handleToogle = () => {
    const { toggleRightSidebar } = this.props;
    toggleRightSidebar();
  };

  render() {
    const { rightSidebarTitle } = this.props;
    return (
      <React.Fragment>
        <div className="right-sidebar-header">
          <i
            className="fa fa-times fa-lg right-sidebar-header__toggle_button"
            onClick={this.handleToogle}
          />

          <div className="right-sidebar-header__title">{rightSidebarTitle}</div>
          <span
            className="right-sidebar-header__my-profile"
            onClick={this.handleClick}
          >
            My Profile
            <i className="fa fa-cog" />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

SidebarHeader.propTypes = {
  rightSidebarTitle: PropTypes.string.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

const stateToProps = state => ({
  /* global state */
  rightSidebarTitle: globalStateSelector.getRightSidebarTitle(state)
});

const dispatchToProps = dispatch => ({
  toggleRightSidebar: () => {
    dispatch(globalStateAction.toggleRightSidebar());
  },
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SidebarHeader);
