import { connect } from "react-redux";

import SidebarHeader from "./SidebarHeader.jsx";

import { globalStateSelector, teamSelector, userSelector } from "@/reducers/";
import { globalStateAction } from "@/actions";

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
)(SidebarHeader);
