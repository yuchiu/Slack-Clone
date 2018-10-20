import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateSelector, teamSelector, userSelector } from "@/selectors/";
import { globalStateAction } from "@/actions";
import SidebarHeader from "./SidebarHeader.jsx";

class SidebarHeaderContainer extends React.Component {
  handleSwitchSidebarViewTeam = () => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView("team");
  };

  handleSwitchSidebarViewMyProfile = () => {
    const {
      toggleRightSidebar,
      switchRightSidebarView,
      isSidebarOpen
    } = this.props;
    if (!isSidebarOpen) {
      toggleRightSidebar();
    }
    switchRightSidebarView("my-profile");
  };

  render() {
    const { currentUser, currentTeam } = this.props;
    return (
      <SidebarHeader
        currentTeam={currentTeam}
        currentUser={currentUser}
        handleSwitchSidebarViewTeam={this.handleSwitchSidebarViewTeam}
        handleSwitchSidebarViewMyProfile={this.handleSwitchSidebarViewMyProfile}
      />
    );
  }
}

SidebarHeaderContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchRightSidebarView: PropTypes.func.isRequired
};
const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state)
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
