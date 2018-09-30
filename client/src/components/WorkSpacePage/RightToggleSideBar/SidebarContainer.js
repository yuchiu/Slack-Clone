import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import "./index.scss";
import { globalStateAction, authAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";
import NavSection from "./NavSection";
import SidebarHeader from "./SidebarHeader";
import { ViewMyProfile } from "./views";

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar = () => {
    const { toggleSideBar } = this.props;
    toggleSideBar();
  };

  handleLogout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    return (
      <div className="sidebar-container">
        <NavSection toggleSideBar={this.toggleSideBar} />
        <SidebarHeader text={"My Profile"} />
        <div className="content-section">
          <ViewMyProfile handleLogout={this.handleLogout} />
        </div>
      </div>
    );
  }
}

SidebarContainer.propTypes = {};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  logoutUser: () => dispatch(authAction.logoutUser()),
  toggleSideBar: () => dispatch(globalStateAction.toggleSideBar())
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(SidebarContainer)
);
