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
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import {
  ViewMyProfile,
  ViewChannel,
  ViewMemberList,
  ViewTeam,
  ViewUser
} from "./sidebarContent";

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

  handleSwitchRightSideBarView = selectedView => {
    const { switchRightSideBarView } = this.props;
    switchRightSideBarView(selectedView);
  };

  render() {
    const {
      currentChannel,
      targetMemberList,
      currentChannelMembers,
      currentTeam,
      rightSideBarTitle,
      rightSideBarView,
      currentTeamMembers,
      switchTargetUser,
      currentUser
    } = this.props;
    return (
      <div className="sidebar-container">
        <SidebarHeader
          toggleSideBar={this.toggleSideBar}
          rightSideBarTitle={rightSideBarTitle}
          switchViewToMyProfile={this.handleSwitchRightSideBarView.bind(
            this,
            "my-profile"
          )}
        />
        <div className="right-side-bar-content">
          {rightSideBarView === "my-profile" && (
            <ViewMyProfile
              currentUser={currentUser}
              handleLogout={this.handleLogout}
            />
          )}
          {rightSideBarView === "user-profile" && <ViewUser />}

          {rightSideBarView === "channel" && (
            <ViewChannel
              currentChannel={currentChannel}
              currentChannelMembers={currentChannelMembers}
              switchViewToMemberList={this.handleSwitchRightSideBarView.bind(
                this,
                "channel-members"
              )}
            />
          )}
          {rightSideBarView === "team" && (
            <ViewTeam
              currentTeam={currentTeam}
              currentTeamMembers={currentTeamMembers}
              switchViewToMemberList={this.handleSwitchRightSideBarView.bind(
                this,
                "team-members"
              )}
            />
          )}
          {rightSideBarView === "message-group-members" && (
            <ViewMemberList
              currentUser={currentUser}
              memeberList={targetMemberList}
              switchTargetUser={switchTargetUser}
              switchViewToUserProfile={this.handleSwitchRightSideBarView.bind(
                this,
                "user-profile"
              )}
              switchViewToMyProfile={this.handleSwitchRightSideBarView.bind(
                this,
                "my-profile"
              )}
            />
          )}
          {rightSideBarView === "channel-members" && (
            <ViewMemberList
              currentUser={currentUser}
              memeberList={currentChannelMembers}
              switchTargetUser={switchTargetUser}
              switchViewToUserProfile={this.handleSwitchRightSideBarView.bind(
                this,
                "user-profile"
              )}
              switchViewToMyProfile={this.handleSwitchRightSideBarView.bind(
                this,
                "my-profile"
              )}
            />
          )}
          {rightSideBarView === "team-members" && (
            <ViewMemberList
              currentUser={currentUser}
              memeberList={currentTeamMembers}
              switchTargetUser={switchTargetUser}
              switchViewToUserProfile={this.handleSwitchRightSideBarView.bind(
                this,
                "user-profile"
              )}
              switchViewToMyProfile={this.handleSwitchRightSideBarView.bind(
                this,
                "my-profile"
              )}
            />
          )}
        </div>
        <SidebarFooter handleLogout={this.handleLogout} />
      </div>
    );
  }
}

SidebarContainer.propTypes = {};

const stateToProps = state => ({
  /* global state */
  rightSideBarView: globalStateSelector.getRightSideBarView(state),
  rightSideBarTitle: globalStateSelector.getRightSideBarTitle(state),

  /* channel selector */
  currentChannel: channelSelector.getCurrentChannel(state),
  targetMemberList: channelSelector.getTargetMemberList(state),
  currentChannelMembers: channelSelector.getCurrentChannelMembers(state),

  /* team selector */
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),

  /* user selector */
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  logoutUser: () => dispatch(authAction.logoutUser()),
  toggleSideBar: () => dispatch(globalStateAction.toggleSideBar()),
  switchTargetUser: targetUserId =>
    dispatch(globalStateAction.switchTargetUser(targetUserId)),
  switchRightSideBarView: selectedView =>
    dispatch(globalStateAction.switchRightSideBarView(selectedView))
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(SidebarContainer)
);
