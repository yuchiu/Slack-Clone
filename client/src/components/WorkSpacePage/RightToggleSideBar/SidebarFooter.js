import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authAction } from "@/actions";

class SidebarFooter extends React.Component {
  handleClick = () => {
    const { history, logoutUser } = this.props;
    logoutUser();
    history.push("/");
  };

  render() {
    return (
      <div className="right-side-bar-footer">
        <button
          className="right-side-bar-button right-side-bar-item"
          onClick={this.handleClick}
        >
          Log Out
        </button>
      </div>
    );
  }
}

SidebarFooter.propTypes = {};

const dispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(authAction.logoutUser());
  }
});

export default withRouter(
  connect(
    null,
    dispatchToProps
  )(SidebarFooter)
);
