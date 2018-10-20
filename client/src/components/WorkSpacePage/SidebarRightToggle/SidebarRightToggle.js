import { connect } from "react-redux";

import { globalStateSelector } from "@/selectors/";
import SidebarRightToggle from "./SidebarRightToggle.jsx";

const stateToProps = state => ({
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state)
});

export default connect(
  stateToProps,
  null
)(SidebarRightToggle);
