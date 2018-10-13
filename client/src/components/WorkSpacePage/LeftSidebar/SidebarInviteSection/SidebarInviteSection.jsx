import React from "react";
import PropTypes from "prop-types";

class SidebarInviteSection extends React.Component {
  render() {
    const { currentTeam, toggleAddTeamMemberModal } = this.props;
    return (
      <React.Fragment>
        {/* {currentTeam.admin && (
          <div
            className="leftsidebar__invite"
            onClick={toggleAddTeamMemberModal}
          >
            <span className="leftsidebar__invite__plus">+</span> Invite People
          </div>
        )} */}

        {/* disable authentication, allow all users to invite members for demo purposes */}
        <div className="leftsidebar__invite" onClick={toggleAddTeamMemberModal}>
          <span className="leftsidebar__invite__plus">+</span> Invite People
        </div>
      </React.Fragment>
    );
  }
}
SidebarInviteSection.propTypes = {
  currentTeam: PropTypes.object.isRequired,

  toggleAddTeamMemberModal: PropTypes.func.isRequired
};

export default SidebarInviteSection;
