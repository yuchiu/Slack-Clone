import React from "react";

import "./index.scss";
import SidebarList from "./SidebarList";
import SidebarHeader from "./SidebarHeader";
import InviteMemberSection from "./InviteMemberSection";
import {
  AddChannelModal,
  AddMessageGroupModal,
  AddTeamMemberModal
} from "./modals";

class LeftSidebar extends React.Component {
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
    return (
      <React.Fragment>
        <section className="leftsidebar">
          <SidebarHeader />
          <SidebarList
            toggleAddMessageGroupModal={this.toggleAddMessageGroupModal}
            toggleAddChannelModal={this.toggleAddChannelModal}
          />
          <InviteMemberSection
            toggleAddTeamMemberModal={this.toggleAddTeamMemberModal}
          />
        </section>
        <AddChannelModal
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="add-channel-modal"
        />
        <AddMessageGroupModal
          onClose={this.toggleAddMessageGroupModal}
          open={openAddMessageGroupModal}
          key="add-message-group-modal"
        />
        <AddTeamMemberModal
          onClose={this.toggleAddTeamMemberModal}
          open={openAddTeamMemberModal}
          key="add-team-member-modal"
        />
      </React.Fragment>
    );
  }
}

export default LeftSidebar;
