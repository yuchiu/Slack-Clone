import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { filterOutCurrentUsername } from "@/utils";
import "./index.scss";
import {
  getCurrentChannelMembers,
  getCurrentChannel,
  getCurrentUser
} from "@/reducers";

class MainHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { currentChannelMembers, currentUser, currentChannel } = this.props;
    return (
      <div className="main-header">
        <h1 className="main-header__title">
          {currentChannel.message_group ? (
            <React.Fragment>
              <span>
                {filterOutCurrentUsername(
                  currentChannel.name,
                  currentUser.username
                )}
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span>
                # {currentChannel.name}
                {currentChannel.public ? (
                  <span> (public) </span>
                ) : (
                  <span> (private) </span>
                )}
              </span>
              <span className="main-header__title__span">
                <i className="users icon main-header__title__span__icon" />{" "}
                <span className="main-header__title__span__number">
                  {currentChannelMembers.length}
                </span>
              </span>
            </React.Fragment>
          )}
        </h1>
      </div>
    );
  }
}

MainHeader.propTypes = {};

const stateToProps = state => ({
  currentChannelMembers: getCurrentChannelMembers(state),
  currentChannel: getCurrentChannel(state),
  currentUser: getCurrentUser(state)
});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(MainHeader)
);
