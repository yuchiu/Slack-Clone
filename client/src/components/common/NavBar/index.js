import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authAction } from "@/actions";
import AuthNavBar from "./AuthNavBar";
import UnauthNavBar from "./UnauthNavBar";
import { authSelector, userSelector } from "@/reducers/selectors";

class NavBar extends React.Component {
  handleLogout = () => {
    const { fetchLogoutUser, history } = this.props;
    fetchLogoutUser();
    history.push("/");
  };

  render() {
    const { isUserLoggedIn, currentUser, history } = this.props;
    return (
      <div className="navbar-container">
        {isUserLoggedIn && (
          <AuthNavBar
            history={history}
            username={currentUser.username}
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
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  fetchLogoutUser: () => {
    dispatch(authAction.fetchLogoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
