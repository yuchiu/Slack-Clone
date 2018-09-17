import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./index.scss";

class MainHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { currentChannelMembers, currentChannel } = this.props;
    return (
      <div className="main-header">
        <h1 className="main-header__title">
          # {currentChannel.name}
          {currentChannel.public ? (
            <span> (public) </span>
          ) : (
            <span> (private) </span>
          )}
          <span className="main-header__title__span">
            <i className="users icon main-header__title__span__icon" />{" "}
            <span className="main-header__title__span__number">
              {currentChannelMembers.length}
            </span>
          </span>
        </h1>
      </div>
    );
  }
}

MainHeader.propTypes = {};

const stateToProps = state => ({
  currentChannelMembers: state.channelReducer.currentChannelMembers,
  currentChannel: state.channelReducer.currentChannel
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
