import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./index.scss";

class MainHeader extends React.Component {
  currentPath = () => {
    const {
      match: { path }
    } = this.props;
    if (path.toLowerCase().includes("channel")) {
      return "channel";
    }
    if (path.toLowerCase().includes("direct-message")) {
      return "direct-message";
    }
    return null;
  };

  render() {
    const { currentChannel, currentTeamMembers } = this.props;
    return (
      <div className="main-header">
        {this.currentPath() === "channel" && (
          <h1>
            # {currentChannel.name}
            <span> | members: {currentTeamMembers.length}</span>
          </h1>
        )}
        {this.currentPath() === "direct-message" && <h1># target User</h1>}
      </div>
    );
  }
}

MainHeader.propTypes = {};

const stateToProps = state => ({
  currentTeam: state.teamReducer.currentTeam,
  currentTeamMembers: state.teamReducer.currentTeamMembers,
  currentChannel: state.channelReducer.currentChannel
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
