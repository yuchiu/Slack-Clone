import { connect } from "react-redux";

import { globalStateAction, teamAction } from "@/actions";
import { teamSelector } from "@/reducers/";

import SidebarRightSticky from "./SidebarRightSticky.jsx";

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
)(SidebarRightSticky);
