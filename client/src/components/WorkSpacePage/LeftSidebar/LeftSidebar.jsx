import React from "react";
import PropTypes from "prop-types";

import "./LeftSidebar.scss";
import ChannelSection from "./ChannelSection/ChannelSection";
import MessageGroupSection from "./MessageGroupSection/MessageGroupSection";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarInviteSection from "./SidebarInviteSection/SidebarInviteSection";
import {
  AddChannelModal,
  AddMessageGroupModal,
  AddTeamMemberModal
} from "./modals";

const LeftSidebar = ({
  addTeamMemberModalOpen,
  addChannelModalOpen,
  addMessageGroupModalOpen,
  toggleAddChannelModal,
  toggleAddMessageGroupModal,
  toggleAddTeamMemberModal
}) => (
  <React.Fragment>
    <section className="leftsidebar">
      <SidebarHeader />
      <ChannelSection toggleAddChannelModal={toggleAddChannelModal} />
      <MessageGroupSection
        toggleAddMessageGroupModal={toggleAddMessageGroupModal}
      />
      <SidebarInviteSection
        toggleAddTeamMemberModal={toggleAddTeamMemberModal}
      />
    </section>
    <AddChannelModal
      onClose={toggleAddChannelModal}
      open={addChannelModalOpen}
      key="add-channel-modal"
    />
    <AddMessageGroupModal
      onClose={toggleAddMessageGroupModal}
      open={addMessageGroupModalOpen}
      key="add-message-group-modal"
    />
    <AddTeamMemberModal
      onClose={toggleAddTeamMemberModal}
      open={addTeamMemberModalOpen}
      key="add-team-member-modal"
    />
  </React.Fragment>
);

LeftSidebar.propTypes = {
  addTeamMemberModalOpen: PropTypes.bool.isRequired,
  addChannelModalOpen: PropTypes.bool.isRequired,
  addMessageGroupModalOpen: PropTypes.bool.isRequired,

  toggleAddChannelModal: PropTypes.func.isRequired,
  toggleAddMessageGroupModal: PropTypes.func.isRequired,
  toggleAddTeamMemberModal: PropTypes.func.isRequired
};
export default LeftSidebar;
