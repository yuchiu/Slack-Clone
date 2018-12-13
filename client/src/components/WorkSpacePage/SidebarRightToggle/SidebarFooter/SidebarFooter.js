import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import SidebarFooter from "./SidebarFooter.jsx";

class SidebarFooterContainer extends React.Component {
  handleClick = () => {
    const { history, fetchSignOutUser, clearAllError } = this.props;
    clearAllError();
    fetchSignOutUser();
    history.push("/");
  };

  render() {
    return <SidebarFooter handleClick={this.handleClick} />;
  }
}

SidebarFooterContainer.propTypes = {
  history: PropTypes.object.isRequired,

  clearAllError: PropTypes.func.isRequired,
  fetchSignOutUser: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  clearAllError: () => {
    dispatch(errorAction.clearAllError());
  },
  fetchSignOutUser: () => {
    dispatch(userAction.fetchSignOutUser());
  }
});

export default withRouter(
  connect(
    null,
    dispatchToProps
  )(SidebarFooterContainer)
);
