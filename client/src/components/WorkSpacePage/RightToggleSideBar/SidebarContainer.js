import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import "./index.scss";
import { globalStateAction, authAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector,
  userSelector
} from "@/reducers/selectors";
import NavSection from "./NavSection";
import SidebarHeader from "./SidebarHeader";
import {
  ViewMyProfile,
  ViewChannel,
  ViewMemberList,
  ViewTeam,
  ViewUser
} from "./views";

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
    const {
      currentChannel,
      targetMemberList,
      currentChannelMembers,
      currentTeam,
      rightSideBarView,
      currentTeamMembers,
      currentUser
    } = this.props;
    return (
      <div className="sidebar-container">
        <NavSection toggleSideBar={this.toggleSideBar} />
        <SidebarHeader text={"My Profile"} />
        <div className="content-section">
          {rightSideBarView}
          {rightSideBarView === "team" && (
            <ViewTeam
              currentUser={currentUser}
              handleLogout={this.handleLogout}
            />
          )}
          {rightSideBarView === "my-profile" && (
            <ViewMyProfile
              currentUser={currentUser}
              handleLogout={this.handleLogout}
            />
          )}
          {rightSideBarView === "member-list" && (
            <ViewMemberList
              currentUser={currentUser}
              handleLogout={this.handleLogout}
            />
          )}
          {rightSideBarView === "channel" && (
            <ViewChannel
              currentUser={currentUser}
              handleLogout={this.handleLogout}
            />
          )}
          {rightSideBarView === "user" && (
            <ViewUser
              currentUser={currentUser}
              handleLogout={this.handleLogout}
            />
          )}
        </div>
      </div>
    );
  }
}

SidebarContainer.propTypes = {};

const stateToProps = state => ({
  rightSideBarView: globalStateSelector.getRightSideBarView(state),
  currentChannel: channelSelector.getCurrentChannel(state),
  targetMemberList: channelSelector.getTargetMemberList(state),
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),
  currentUser: userSelector.getCurrentUser(state)
});

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
