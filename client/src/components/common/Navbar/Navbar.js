import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar.jsx";
import { userAction } from "@/actions";
import { authSelector, userSelector } from "@/reducers/";

const stateToProps = state => ({
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  fetchLogoutUser: () => {
    dispatch(userAction.fetchLogoutUser());
  }
});

const NavbarContainer = withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(Navbar)
);

export default NavbarContainer;
