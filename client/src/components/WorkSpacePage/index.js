import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./index.scss";
import { sessionStore } from "@/utils";
import { teamAction, errorAction, globalStateAction } from "@/actions";
import LeftSidebar from "./LeftSidebar";
import MainHeader from "./MainHeader";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";
import RightStickySidebar from "./RightStickySidebar";
import RightToggleSidebar from "./RightToggleSidebar";
import ErrorModal from "./ErrorModal";
import {
  teamSelector,
  channelSelector,
  globalStateSelector,
  errorSelector
} from "@/reducers/selectors";

class WorkSpacePage extends React.Component {
  state = {
    openErrorModal: false
  };

  componentDidMount() {
    const { fetchTeamAssociatedList, receiveSocketNewTeamMember } = this.props;
    receiveSocketNewTeamMember();
    /* get channelList, messageGroupList, teamMembers when component mount */
    if (this.isCurrentTeamExist()) {
      const teamId = sessionStore.getTeamId();
      fetchTeamAssociatedList(teamId);
    }
  }

  toggleErrorModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openErrorModal: !this.state.openErrorModal
    });
  };

  isCurrentTeamExist = () => {
    if (sessionStore.getTeamId() === "0") return false;
    return true;
  };

  componentWillUnmount() {
    const { clearSocketConnection } = this.props;
    clearSocketConnection();
  }

  render() {
    const { openErrorModal } = this.state;
    const { error, clearAllError, isSidebarOpen } = this.props;
    return (
      <React.Fragment>
        {/* redirect to create team if user is not in any team */}
        {!this.isCurrentTeamExist() && <Redirect to="/create-team" />}
        {/* render workspace if currentTeam exist */}
        {this.isCurrentTeamExist() && (
          <RightToggleSidebar>
            <main
              className={`workspace-page workspace-page--sidebar-${isSidebarOpen}`}
            >
              {error && !openErrorModal ? this.toggleErrorModal() : null}
              <LeftSidebar />
              <MainHeader />
              <MessagesContainer />
              <InputContainer />
              <RightStickySidebar />
              <ErrorModal
                onClose={this.toggleErrorModal}
                open={openErrorModal}
                error={error}
                clearAllError={clearAllError}
                key="error-modal"
              />
            </main>
          </RightToggleSidebar>
        )}
      </React.Fragment>
    );
  }
}

WorkSpacePage.propTypes = {
  teamList: PropTypes.array.isRequired,
  currentTeam: PropTypes.object.isRequired,
  channelList: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,

  clearSocketConnection: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequired,
  fetchTeamAssociatedList: PropTypes.func.isRequired,
  getCurrentTeam: PropTypes.func.isRequired,
  getCurrentChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  teamList: teamSelector.getTeamList(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  channelList: channelSelector.getChannelList(state),
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
)(WorkSpacePage);
