import { connect } from "react-redux";

import { globalStateSelector } from "@/reducers/selectors";
import RightToggleSidebar from "./RightToggleSidebar.jsx";

const stateToProps = state => ({
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state)
});

export default connect(
  stateToProps,
  null
)(RightToggleSidebar);
