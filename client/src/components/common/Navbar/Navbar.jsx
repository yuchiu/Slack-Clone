import React from "react";
import PropTypes from "prop-types";

import AuthNavBar from "./AuthNavbar.jsx";
import UnauthNavBar from "./UnauthNavbar.jsx";

class Navbar extends React.Component {
  handleLogout = () => {
    const { fetchLogoutUser, history } = this.props;
    fetchLogoutUser();
    history.push("/");
  };

  render() {
    const { isUserLoggedIn, currentUser, history } = this.props;

    return (
      <div className="navbar-wrapper">
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

Navbar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Navbar;
