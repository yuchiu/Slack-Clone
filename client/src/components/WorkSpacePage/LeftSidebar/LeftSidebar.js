import React from "react";

import LeftSidebar from "./LeftSidebar.jsx";

class LeftSidebarContainer extends React.PureComponent {
  state = {
    addChannelModalOpen: false,
    addTeamMemberModalOpen: false,
    addMessageGroupModalOpen: false
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ addChannelModalOpen: !this.state.addChannelModalOpen });
  };

  toggleAddMessageGroupModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      addMessageGroupModalOpen: !this.state.addMessageGroupModalOpen
    });
  };

  toggleAddTeamMemberModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      addTeamMemberModalOpen: !this.state.addTeamMemberModalOpen
    });
  };

  render() {
    const {
      addTeamMemberModalOpen,
      addChannelModalOpen,
      addMessageGroupModalOpen
    } = this.state;
    return (
      <LeftSidebar
        addTeamMemberModalOpen={addTeamMemberModalOpen}
        addChannelModalOpen={addChannelModalOpen}
        addMessageGroupModalOpen={addMessageGroupModalOpen}
        toggleAddChannelModal={this.toggleAddChannelModal}
        toggleAddMessageGroupModal={this.toggleAddMessageGroupModal}
        toggleAddTeamMemberModal={this.toggleAddTeamMemberModal}
      />
    );
  }
}

export default LeftSidebarContainer;
