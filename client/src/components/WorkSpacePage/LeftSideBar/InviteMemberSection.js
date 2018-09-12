import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

class InviteMemberSection extends React.Component {
  state = {};

  render() {
    const { isAdmin, toggleAddTeamMemberModal } = this.props;
    return (
      <React.Fragment>
        {isAdmin && (
          <div
            className="leftsidebar__invite"
            onClick={toggleAddTeamMemberModal}
          >
            <span className="leftsidebar__invite__plus">+</span> Invite People
            To Team
          </div>
        )}
      </React.Fragment>
    );
  }
}
InviteMemberSection.propTypes = {};

export default InviteMemberSection;
