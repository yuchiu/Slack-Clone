import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { sessionStore } from "@/utils";
import { teamAction, errorAction, globalStateAction } from "@/actions";
import {
  teamSelector,
  globalStateSelector,
  errorSelector
} from "@/reducers/selectors";
import WorkSpacePage from "./WorkSpacePage.jsx";

class WorkSpacePageContainer extends React.Component {
  state = {
    errorModalOpen: false
  };

  UNSAFE_componentWillMount() {
    const { fetchTeamAssociatedList, receiveSocketNewTeamMember } = this.props;
    receiveSocketNewTeamMember();
    // get channelList, messageGroupList, teamMemberList when component mount
    if (this.isCurrentTeamExist()) {
      const teamId = sessionStore.getTeamId();
      fetchTeamAssociatedList(teamId);
    }
  }

  componentWillUnmount() {
    const { clearSocketConnection } = this.props;
    clearSocketConnection();
  }

  toggleErrorModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      errorModalOpen: !this.state.errorModalOpen
    });
  };

  isCurrentTeamExist = () => {
    if (sessionStore.getTeamId() === "0") return false;
    return true;
  };

  render() {
    const { errorModalOpen } = this.state;
    const { error, clearAllError, isSidebarOpen } = this.props;
    return (
      <WorkSpacePage
        isCurrentTeamExist={this.isCurrentTeamExist}
        toggleErrorModal={this.toggleErrorModal}
        isSidebarOpen={isSidebarOpen}
        errorModalOpen={errorModalOpen}
        error={error}
        clearAllError={clearAllError}
        key="error-modal"
      />
    );
  }
}

WorkSpacePageContainer.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,

  clearSocketConnection: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequired,
  fetchTeamAssociatedList: PropTypes.func.isRequired,
  receiveSocketNewTeamMember: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  error: errorSelector.getError(state),
  isSidebarOpen: globalStateSelector.getIsSidebarOpen(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => {
    dispatch(errorAction.clearAllError());
  },
  fetchTeamAssociatedList: teamId => {
    dispatch(teamAction.fetchTeamAssociatedList(teamId));
  },
  clearSocketConnection: () => {
    dispatch(globalStateAction.clearSocketConnection());
  },
  receiveSocketNewTeamMember: () => {
    dispatch(teamAction.receiveSocketNewTeamMember());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePageContainer);
