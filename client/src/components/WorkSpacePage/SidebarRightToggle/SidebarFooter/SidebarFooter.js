import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import SidebarFooter from "./SidebarFooter.jsx";

const dispatchToProps = dispatch => ({
  clearAllError: () => {
    dispatch(errorAction.clearAllError());
  },
  fetchLogoutUser: () => {
    dispatch(userAction.fetchLogoutUser());
  }
});

export default withRouter(
  connect(
    null,
    dispatchToProps
  )(SidebarFooter)
);
