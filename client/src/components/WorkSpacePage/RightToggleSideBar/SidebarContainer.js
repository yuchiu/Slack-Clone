import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import "./index.scss";
import { globalStateAction, authAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";

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
      <React.Fragment>
        <i
          className="fa fa-times fa-lg toggle_button"
          onClick={this.toggleSideBar}
        />
        <nav>target | user</nav>
        <div>content</div>
        <div>
          <button onClick={this.handleLogout}>logout</button>
        </div>
      </React.Fragment>
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
