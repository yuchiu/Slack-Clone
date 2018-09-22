import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./index.scss";
import ChannelHeader from "./ChannelHeader";
import ChannelList from "./ChannelList";
import MessageGroupHeader from "./MessageGroupHeader";
import MessageGroupList from "./MessageGroupList";
import SideBarHeader from "./SideBarHeader";
import InviteMemberSection from "./InviteMemberSection";
import {
  AddChannelModal,
  AddMessageGroupModal,
  AddTeamMemberModal
} from "./modals";
import {
  getChannelList,
  getMessageGroupList,
  getCurrentTeam,
  getCurrentUser
} from "@/reducers";

class LeftSideBar extends React.Component {
  state = {
    openAddChannelModal: false,
    openAddTeamMemberModal: false,
    openAddMessageGroupModal: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  toggleAddMessageGroupModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openAddMessageGroupModal: !this.state.openAddMessageGroupModal
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
      openAddMessageGroupModal
    } = this.state;
    const {
      currentUser,
      currentTeam,
      messageGroupList,
      channelList
    } = this.props;
    return (
      <React.Fragment>
        <section className="leftsidebar">
          <SideBarHeader currentUser={currentUser} currentTeam={currentTeam} />
          <ul className="leftsidebar__List">
            <ChannelHeader
              isAdmin={currentTeam.admin}
              toggleAddChannelModal={this.toggleAddChannelModal}
            />
            <ChannelList teamId={currentTeam.id} channelList={channelList} />
          </ul>
          <ul className="leftsidebar__List">
            <MessageGroupHeader
              toggleAddMessageGroupModal={this.toggleAddMessageGroupModal}
            />
            <MessageGroupList
              teamId={currentTeam.id}
              messageGroupList={messageGroupList}
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
          key="add-channel-modal"
        />
        <AddMessageGroupModal
          teamId={currentTeam.id}
          onClose={this.toggleAddMessageGroupModal}
          open={openAddMessageGroupModal}
          key="add-message-group-modal"
        />
        <AddTeamMemberModal
          teamId={currentTeam.id}
          onClose={this.toggleAddTeamMemberModal}
          open={openAddTeamMemberModal}
          key="add-team-member-modal"
        />
      </React.Fragment>
    );
  }
}
LeftSideBar.propTypes = {
  currentTeam: PropTypes.object.isRequired
};
/* currentUser, channel, direct messages */
const stateToProps = state => ({
  currentUser: getCurrentUser(state),
  currentTeam: getCurrentTeam(state),
  channelList: getChannelList(state),
  messageGroupList: getMessageGroupList(state)
});

export default connect(
  stateToProps,
  null
)(LeftSideBar);
