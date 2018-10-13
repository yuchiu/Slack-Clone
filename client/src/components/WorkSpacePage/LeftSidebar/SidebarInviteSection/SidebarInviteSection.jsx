import React from "react";
import PropTypes from "prop-types";

class SidebarInviteSection extends React.Component {
  render() {
    const { isAdmin, toggleAddTeamMemberModal } = this.props;
    return (
      <React.Fragment>
        {/* {isAdmin && (
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
  isAdmin: PropTypes.bool.isRequired,

  currentTeam: PropTypes.object.isRequired
};

export default SidebarInviteSection;
