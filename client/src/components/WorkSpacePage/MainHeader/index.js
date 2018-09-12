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

  getCurrentChannelFromParams = channelList => {
    const {
      currentChannel,
      match: { params }
    } = this.props;

    /* return default current channel if params is empty */
    if (!params.channelId) {
      return currentChannel;
    }

    /* return current channel using params */
    const currentChannelFromParams = channelList.find(
      channel => channel.id === parseInt(params.channelId, 10)
    );
    return currentChannelFromParams;
  };

  render() {
    const { currentTeamMembers, channelList } = this.props;
    return (
      <div className="main-header">
        {this.currentPath() === "channel" && (
          <h1 className="main-header__title">
            #{" "}
            {channelList.length > 0 &&
              this.getCurrentChannelFromParams(channelList).name}
            <span className="main-header__title__span">
              <i className="users icon main-header__title__span__icon" />{" "}
              <span className="main-header__title__span__number">
                {currentTeamMembers.length}
              </span>
            </span>
          </h1>
        )}
        {this.currentPath() === "direct-message" && (
          <h1 className="main-header__title"># target User</h1>
        )}
      </div>
    );
  }
}

MainHeader.propTypes = {};

const stateToProps = state => ({
  currentTeamMembers: state.teamReducer.currentTeamMembers,
  currentChannel: state.channelReducer.currentChannel,
  channelList: state.channelReducer.channelList
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
