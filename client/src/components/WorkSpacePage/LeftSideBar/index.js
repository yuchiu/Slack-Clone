import React from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import ChannelList from "./ChannelList";
import DirectMessageHeader from "./DirectMessageHeader";
import DirectMessageList from "./DirectMessageList";
import SideBarHeader from "./SideBarHeader";
import InviteMemberSection from "./InviteMemberSection";
import {
  AddChannelModal,
  AddDirectMessageModal,
  AddTeamMemberModal
} from "./modals";

class LeftSideBar extends React.Component {
  state = {
    openAddChannelModal: false,
    openAddTeamMemberModal: false,
    openAddDirectMessageModal: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  toggleAddDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openAddDirectMessageModal: !this.state.openAddDirectMessageModal
    });
  };

  toggleAddTeamMemberModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openAddTeamMemberModal: !this.state.openAddTeamMemberModal
    });
  };

  render() {
    const {
      openAddTeamMemberModal,
      openAddChannelModal,
      openAddDirectMessageModal
    } = this.state;
    const {
      user,
      currentTeam,
      directMessageMemberList,
      channelList
    } = this.props;
    return (
      <React.Fragment>
        <section className="leftsidebar">
          <SideBarHeader user={user} currentTeam={currentTeam} />
          <ul className="leftsidebar__List">
            <ChannelHeader
              isAdmin={currentTeam.admin}
              toggleAddChannelModal={this.toggleAddChannelModal}
            />
            <ChannelList channelList={channelList} />
          </ul>
          <ul className="leftsidebar__List">
            <DirectMessageHeader
              toggleAddDirectMessageModal={this.toggleAddDirectMessageModal}
            />
            <DirectMessageList
              directMessageMemberList={directMessageMemberList}
            />
          </ul>
          <InviteMemberSection
            isAdmin={currentTeam.admin}
            toggleAddTeamMemberModal={this.toggleAddTeamMemberModal}
          />
        </section>
        <AddChannelModal
          teamId={currentTeam.id}
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="sidebar-add-channel-modal"
        />
        <AddDirectMessageModal
          teamId={currentTeam.id}
          onClose={this.toggleAddDirectMessageModal}
          open={openAddDirectMessageModal}
          key="sidebar-direct-message-modal"
        />
        <AddTeamMemberModal
          teamId={currentTeam.id}
          onClose={this.toggleAddTeamMemberModal}
          open={openAddTeamMemberModal}
          key="Invite-people-modal"
        />
      </React.Fragment>
    );
  }
}
LeftSideBar.propTypes = {
  currentTeam: Proptypes.object.isRequired
};

/* user, channel, direct messages */
const stateToProps = state => ({
  user: state.userReducer.user,
  currentTeam: state.teamReducer.currentTeam,
  channelList: state.channelReducer.channelList,
  directMessageMemberList: state.directMessageReducer.directMessageMemberList
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(LeftSideBar);
