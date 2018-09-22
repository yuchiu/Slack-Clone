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
import {
  getChannelList,
  getTeamList,
  getError,
  getCurrentTeam
} from "@/reducers";

class WorkSpacePage extends React.Component {
  state = {
    hasError: false,
    openErrorModal: false
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true,
      currentTeamParam: "",
      currentChannelParam: ""
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
      fetchCurrentTeam,
      fetchCurrentChannel,
      teamList,
      channelList,
      match: { params }
    } = this.props;
    const { currentTeamParam, currentChannelParam } = this.state;
    /* get currentTeam based on params, if params is missing then use previous states */
    if (
      currentChannelParam !== params.channelId ||
      currentTeamParam !== params.teamId
    ) {
      if (teamList.length > 0 && channelList.length > 0) {
        fetchCurrentTeam(params);
        fetchCurrentChannel(params);
        this.setState({
          currentTeamParam: params.teamId,
          currentChannelParam: params.channelId
        });
      }
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
  teamList: getTeamList(state),
  currentTeam: getCurrentTeam(state),
  channelList: getChannelList(state),
  error: getError(state)
});

const dispatchToProps = dispatch => ({
  clearError: () => dispatch(errorAction.clearError()),
  getTeamAssociatedList: teamId => {
    dispatch(teamAction.getTeamAssociatedList(teamId));
  },
  fetchCurrentTeam: params => {
    dispatch(teamAction.fetchCurrentTeam(params));
  },
  fetchCurrentChannel: params => {
    dispatch(channelAction.fetchCurrentChannel(params));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePage);
