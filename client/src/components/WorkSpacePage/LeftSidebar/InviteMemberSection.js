import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamSelector } from "@/reducers/selectors";

class InviteMemberSection extends React.Component {
  state = {};

  render() {
    const { currentTeam, toggleAddTeamMemberModal } = this.props;
    return (
      <React.Fragment>
        {currentTeam.admin && (
          <div
            className="leftsidebar__invite"
            onClick={toggleAddTeamMemberModal}
          >
            <span className="leftsidebar__invite__plus">+</span> Invite People
          </div>
        )}
      </React.Fragment>
    );
  }
}
InviteMemberSection.propTypes = {
  toggleAddTeamMemberModal: PropTypes.func.isRequired,

  currentTeam: PropTypes.object.isRequired
};

/* currentUser, channel, direct messages */
const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state)
});

export default connect(
  stateToProps,
  null
)(InviteMemberSection);
