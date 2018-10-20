import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/selectors/";
import SidebarHeader from "./SidebarHeader.jsx";

class SidebarHeaderContainer extends React.Component {
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
      <SidebarHeader
        rightSidebarTitle={rightSidebarTitle}
        handleToogle={this.handleToogle}
        handleClick={this.handleClick}
      />
    );
  }
}

SidebarHeaderContainer.propTypes = {
  rightSidebarTitle: PropTypes.string.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};

const stateToProps = state => ({
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
)(SidebarHeaderContainer);
