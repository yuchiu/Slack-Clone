import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { teamSelector } from "@/reducers/";
import TeamDetailView from "./TeamDetailView.jsx";

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = dispatch => ({
  switchRightSidebarView: selectedView => {
    dispatch(globalStateAction.switchRightSidebarView(selectedView));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TeamDetailView);
