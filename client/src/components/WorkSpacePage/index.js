import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./index.scss";
import { sessionStore } from "@/utils";
import { teamAction, errorAction, channelAction } from "@/actions";
import ErrorPage from "@/components/ErrorPage";
import LeftSideBar from "./LeftSideBar";
import MainHeader from "./MainHeader";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";
import RightSideBar from "./RightSideBar";
import ErrorModal from "./ErrorModal";

class WorkSpacePage extends React.Component {
  state = {
    hasError: false,
    openErrorModal: false
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  componentDidMount() {
    const { getTeamAssociatedList } = this.props;

    /* get channelList, messageGroupList, teamMembers when component mount */
    if (this.isCurrentTeamExist()) {
      const teamId = sessionStore.getTeamId();
      getTeamAssociatedList(teamId);
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

  componentDidUpdate = () => {
    const {
      getCurrentTeam,
      getCurrentChannel,
      teamList,
      channelList,
      match: { params }
    } = this.props;

    /* get currentTeam based on params, if params is missing then use previous states */
    if (teamList.length > 0 && channelList.length > 0) {
      getCurrentTeam(params);
      getCurrentChannel(params);
    }
  };

  render() {
    const { hasError, openErrorModal } = this.state;
    const { error, clearError } = this.props;
    return hasError ? (
      <ErrorPage />
    ) : (
      <React.Fragment>
        {/* redirect to create team if user is not in any team */}
        {!this.isCurrentTeamExist() && <Redirect to="/create-team" />}
        {/* render workspace if currentTeam exist */}
        {this.isCurrentTeamExist() && (
          <main className="workspace-page">
            {error && !openErrorModal ? this.toggleErrorModal() : null}
            <LeftSideBar />
            <MainHeader />
            <MessagesContainer />
            <InputContainer />
            <RightSideBar />
            <ErrorModal
              onClose={this.toggleErrorModal}
              open={openErrorModal}
              error={error}
              clearError={clearError}
              key="error-modal"
            />
          </main>
        )}
      </React.Fragment>
    );
  }
}

WorkSpacePage.propTypes = {
  params: PropTypes.object,
  match: PropTypes.object
};

const stateToProps = state => ({
  teamList: state.teamReducer.teamList,
  currentTeam: state.teamReducer.currentTeam,
  channelList: state.channelReducer.channelList,
  error: state.errorReducer.error
});

const dispatchToProps = dispatch => ({
  clearError: () => dispatch(errorAction.clearError()),
  getTeamAssociatedList: teamId => {
    dispatch(teamAction.getTeamAssociatedList(teamId));
  },
  getCurrentTeam: params => {
    dispatch(teamAction.getCurrentTeam(params));
  },
  getCurrentChannel: params => {
    dispatch(channelAction.getCurrentChannel(params));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePage);
