import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { teamSelector } from "@/reducers/selectors";
import SidebarInviteSection from "./SidebarInviteSection.jsx";

class InviteMemberSectionContainer extends React.Component {
  render() {
    const { currentTeam, toggleAddTeamMemberModal } = this.props;
    return (
      <SidebarInviteSection
        isAdmin={currentTeam.admin}
        toggleAddTeamMemberModal={toggleAddTeamMemberModal}
      />
    );
  }
}
InviteMemberSectionContainer.propTypes = {
  toggleAddTeamMemberModal: PropTypes.func.isRequired,

  currentTeam: PropTypes.object.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state)
});

export default connect(
  stateToProps,
  null
)(InviteMemberSectionContainer);
