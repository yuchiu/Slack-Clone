import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { globalStateAction } from "@/actions";
import { teamSelector } from "@/selectors/";
import TeamDetailView from "./TeamDetailView.jsx";

class TeamDetailViewContainer extends React.Component {
  handleClick = () => {
    const { switchRightSidebarView } = this.props;
    switchRightSidebarView("channel-members");
  };

  render() {
    const { currentTeam, currentTeamMemberList } = this.props;
    return (
      <TeamDetailView
        currentTeam={currentTeam}
        currentTeamMemberList={currentTeamMemberList}
        handleClick={this.handleClick}
      />
    );
  }
}

TeamDetailViewContainer.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  switchRightSidebarView: PropTypes.func.isRequired
};
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
)(TeamDetailViewContainer);
