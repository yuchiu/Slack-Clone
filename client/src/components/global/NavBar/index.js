import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authAction } from "@/actions";
import AuthNavBar from "./AuthNavBar";
import UnauthNavBar from "./UnauthNavBar";

class NavBar extends React.Component {
  handleLogout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    const { isUserLoggedIn, username, history } = this.props;
    return (
      <div className="navbar-container">
        {isUserLoggedIn && (
          <AuthNavBar
            history={history}
            username={username}
            handleLogout={this.handleLogout}
          />
        )}
        {!isUserLoggedIn && <UnauthNavBar history={history} />}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: state.authReducer.isUserLoggedIn,
  username: state.userReducer.currentUser.username
});

const dispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(authAction.logoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
