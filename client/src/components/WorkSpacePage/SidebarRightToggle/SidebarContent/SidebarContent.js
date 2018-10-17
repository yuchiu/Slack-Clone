import { connect } from "react-redux";

import { globalStateSelector } from "@/reducers/selectors";
import SidebarContent from "./SidebarContent.jsx";

const stateToProps = state => ({
  rightSidebarView: globalStateSelector.getRightSidebarView(state)
});

export default connect(
  stateToProps,
  null
)(SidebarContent);
