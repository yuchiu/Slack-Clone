import React from "react";
import PropTypes from "prop-types";

import "./Navbar.scss";
import AuthNavBar from "./AuthNavbar.jsx";
import UnauthNavBar from "./UnauthNavbar.jsx";

const Navbar = ({ isUserLoggedIn, handleLogout, currentUser, history }) => (
  <div className="navbar-wrapper">
    {isUserLoggedIn && (
      <AuthNavBar
        history={history}
        username={currentUser.username}
        handleLogout={handleLogout}
      />
    )}
    {!isUserLoggedIn && <UnauthNavBar history={history} />}
  </div>
);

Navbar.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  handleLogout: PropTypes.func.isRequired
};

export default Navbar;
