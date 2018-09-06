import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction } from "@/actions";
import AuthNavBar from "./AuthNavBar";
import UnauthNavBar from "./UnauthNavBar";

class NavBar extends React.Component {
  state = {
    current: ""
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  handleLogout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    const { isUserLoggedIn, username } = this.props;
    const { current } = this.state;
    return (
      <div className="navbar-container">
        {isUserLoggedIn && (
          <AuthNavBar
            handleClick={this.handleClick}
            selectedKeys={[current]}
            username={username}
            handleLogout={this.handleLogout}
          />
        )}
        {!isUserLoggedIn && (
          <UnauthNavBar
            handleClick={this.handleClick}
            selectedKeys={[current]}
          />
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: state.userReducer.isUserLoggedIn,
  username: state.userReducer.user.username
});

const dispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(userAction.logoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
