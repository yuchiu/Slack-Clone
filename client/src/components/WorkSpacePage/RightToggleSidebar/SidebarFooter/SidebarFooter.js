import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction } from "@/actions";
import SidebarFooter from "./SidebarFooter.jsx";

const dispatchToProps = dispatch => ({
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
