import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/reducers/";
import SidebarHeader from "./SidebarHeader.jsx";

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
