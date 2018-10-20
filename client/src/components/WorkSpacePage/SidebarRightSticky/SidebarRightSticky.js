import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction, teamAction } from "@/actions";
import { teamSelector } from "@/selectors/";
import SidebarRightSticky from "./SidebarRightSticky.jsx";

class SidebarRightStickyContainer extends React.Component {
  render() {
    const {
      teamList,
      switchTeam,
      fetchTeamAssociatedList,
      toggleRightSidebar
    } = this.props;
    return (
      <SidebarRightSticky
        teamList={teamList}
        switchTeam={switchTeam}
        fetchTeamAssociatedList={fetchTeamAssociatedList}
        toggleRightSidebar={toggleRightSidebar}
      />
    );
  }
}

SidebarRightStickyContainer.propTypes = {
  teamList: PropTypes.array.isRequired,

  toggleRightSidebar: PropTypes.func.isRequired,
  switchTeam: PropTypes.func.isRequired,
  fetchTeamAssociatedList: PropTypes.func.isRequired
};

const stateToProps = state => ({
  teamList: teamSelector.getTeamList(state)
});

const dispatchToProps = dispatch => ({
  toggleRightSidebar: () => {
    dispatch(globalStateAction.toggleRightSidebar());
  },
  switchTeam: teamId => {
    dispatch(teamAction.switchTeam(teamId));
  },
  fetchTeamAssociatedList: teamId => {
    dispatch(teamAction.fetchTeamAssociatedList(teamId));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(SidebarRightStickyContainer);
