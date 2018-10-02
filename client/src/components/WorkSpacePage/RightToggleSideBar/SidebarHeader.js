import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";

class SidebarHeader extends React.Component {
  handleClick = () => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView("my-profile");
  };

  handleToogle = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

  render() {
    const { rightSideBarTitle } = this.props;
    return (
      <React.Fragment>
        <div className="right-side-bar-header">
          <i
            className="fa fa-times fa-lg right-side-bar-header__toggle_button"
            onClick={this.handleToogle}
          />

          <div className="right-side-bar-header__title">
            {rightSideBarTitle}
          </div>
          <span
            className="right-side-bar-header__my-profile"
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

SidebarHeader.propTypes = {};

const stateToProps = state => ({
  /* global state */
  rightSideBarTitle: globalStateSelector.getRightSideBarTitle(state)
});

const dispatchToProps = dispatch => ({
  toggleSideBar: () => {
    dispatch(globalStateAction.toggleSideBar());
  },
  switchRightSideBarView: selectedView => {
    dispatch(globalStateAction.switchRightSideBarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SidebarHeader);
